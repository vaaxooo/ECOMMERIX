<?php

namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Categories extends Controller
{

    /**
     * GET CATEGORIES LIST
     */
    public function getCategories()
    {
        $SQL = "SELECT * FROM `categories` WHERE `active` = :active";
        $categories = DBModel::Query($SQL, "all", [
            ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
        ]);
        exit(json_encode(["categories" => $categories, "ok" => true]));
    }

}