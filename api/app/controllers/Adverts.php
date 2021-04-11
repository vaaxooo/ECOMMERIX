<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class Adverts extends Controller
{

    public function getBannerAdverts()
    {

        try {
            $adverts = $this->memcache->get("banners") ? $this->memcache->get("banners") : NULL;
            if(!$adverts) {
                $this->pdo->beginTransaction();
                $SQL = "SELECT * FROM `adverts` WHERE `banner` = :banner AND `active` = :active";
                $stmt = $this->pdo->prepare($SQL);
                $stmt->bindValue(":banner", (int)1, PDO::PARAM_INT);
                $stmt->bindValue(":active", (int)1, PDO::PARAM_INT);
                $stmt->execute();
                $adverts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->pdo->commit();
                $this->memcache->set("banners", $adverts,MEMCACHE_COMPRESSED, time() + 120);
            }

        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }

        exit(json_encode(["adverts" => $adverts, "ok" => true]));
    }

}