<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Adverts extends Controller
{

    public function getBannerAdverts()
    {
        $adverts = $this->memcache->cache("banners");

        if (!$adverts) {

            $SQL = "SELECT * FROM `adverts` WHERE `banner` = :banner AND `active` = :active";
            $adverts = DBModel::Query($SQL, "all", [
                ["key" => ":banner", "value" => (int)1, "param" => PDO::PARAM_INT],
                ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ]);
            $this->memcache->cache("banners", $adverts, "set", 120);
        }

        exit(json_encode(["adverts" => $adverts, "ok" => true]));
    }

}