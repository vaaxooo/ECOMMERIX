<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class WEB extends Controller
{

    public function getSerializeData()
    {
        try {
            $this->pdo->beginTransaction();

            $web = new \App\models\SiteSettings();
            $web = $web->get();

            $currencies = $this->memcache->get("currencies") ? $this->memcache->get("currencies") : NULL;

            if(!$currencies){
                $SQL = "SELECT `code`, `name` FROM currencies  WHERE currencies.active = :active";
                $stmt = $this->pdo->prepare($SQL);
                $stmt->bindValue(":active", (int) 1, PDO::PARAM_INT);
                $stmt->execute();
                $currencies = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->memcache->set("currencies", $currencies,MEMCACHE_COMPRESSED, time() + 1800);
            }

            $languages = $this->memcache->get("languages") ? $this->memcache->get("languages") : NULL;

            if(!$languages) {
                $SQL = "SELECT `code`, `name` FROM languages  WHERE languages.active = :active";
                $stmt = $this->pdo->prepare($SQL);
                $stmt->bindValue(":active", (int)1, PDO::PARAM_INT);
                $stmt->execute();
                $languages = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->memcache->set("languages", $languages,MEMCACHE_COMPRESSED, time() + 1800);
            }

            $this->pdo->commit();

            exit(json_encode(["data" => ["web" => $web, "currencies" => $currencies, "languages" => $languages], "ok" => true]));
        } catch (\Exception $exception) {
            $this->pdo->rollback();
        }
    }

}