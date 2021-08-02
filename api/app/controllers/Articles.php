<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Articles extends Controller
{

    /**
     * GET ARTICLES LIST
     * @return bool|mixed
     */
    public function getArticles()
    {
        $params = json_decode($_POST['params']);
        $count = $params->count <= 21 ? $params->count : 21;

        $articles = $this->memcache->cache("articles");

        if(!$articles) {

            $SQL = "SELECT * FROM `articles` WHERE `active` = :active ORDER BY `id` DESC LIMIT :count";
            $articles = DBModel::Query($SQL, "all", [
                ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
                ["key" => ":count", "value" => (int)$count, "param" => PDO::PARAM_INT],
            ]);

            $this->memcache->cache("articles", $articles, "set", 180);
        }

        exit(json_encode(["articles" => $articles, "ok" => true]));
    }

    /**
     * GET ARTICLE DATA
     */
    public function getArticleData()
    {
        $article_name = (string)$_POST['params'];
        $article_name = explode("-", $article_name);
        $article_id = (int)$article_name[count($article_name) - 1];

        $SQL = "SELECT * FROM `articles` WHERE `id` = :article_id AND `active` = :active";
        $article = DBModel::Query($SQL, "one", [
            ["key" => ":article_id", "value" => (int)$article_id, "param" => PDO::PARAM_INT],
            ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
        ]);

        !$article ? exit(json_encode(["message" => $this->language->article_not_found, "ok" => false])) : NULL;

        exit(json_encode(["article" => $article, "ok" => true]));
    }

}