<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Pages extends Controller
{

    /**
     * GET ALL PAGES
     * @return bool|mixed
     */
    public function getPages()
    {
        $pages = $this->memcache->cache("pages");

        if (!$pages) {
            $SQL = "SELECT pages.url, pages.title FROM pages WHERE pages.active = :active";
            $pages = DBModel::Query($SQL, "all", [
                ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ]);
            $this->memcache->cache("pages", $pages, "set", 180);
        }

        exit(json_encode(["pages" => $pages, "ok" => true]));
    }

    /**
     * Get page data by url
     */
    public function getPageData()
    {

        $pageUrl = (string)json_decode($_POST['params'])->page;


        $SQL = "SELECT * FROM pages WHERE pages.url = :url AND pages.active = :active LIMIT :limit";
        $page = DBModel::Query($SQL, "one", [
            ["key" => ":url", "value" => (string)$pageUrl, "param" => PDO::PARAM_STR],
            ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ["key" => ":limit", "value" => (int)1, "param" => PDO::PARAM_INT],
        ]);

        !$page ? exit(json_encode(["message" => "", "ok" => false])) : exit(json_encode([
            "page" => $page,
            "ok" => true
        ]));
    }

}