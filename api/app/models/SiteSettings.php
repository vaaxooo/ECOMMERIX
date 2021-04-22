<?php

namespace App\models;

use App\libs\Controller;
use PDO;

class SiteSettings extends Controller {


    /**
     * @return array|false|mixed|string
     */
    public function get()
    {
        try {
            $site_settings = $this->memcache->get("site_settings") ? $this->memcache->get("site_settings") : NULL;
            if(!$site_settings){
                $this->pdo->beginTransaction();
                $SQL = "SELECT * FROM `site_settings` WHERE `id` = :id";
                $stmt = $this->pdo->prepare($SQL);
                $stmt->bindValue(":id", 1, PDO::PARAM_INT);
                $stmt->execute();
                $site_settings = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->pdo->commit();
                $this->memcache->set("site_settings", $site_settings,MEMCACHE_COMPRESSED, time() + 1800);
            }

            return $site_settings;
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }
    }

}