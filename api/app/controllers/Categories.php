<?php

namespace App\controllers;

use App\libs\Controller;
use PDO;

class Categories extends Controller
{

    public function getCategories()
    {

        try {

            $this->pdo->beginTransaction();
            $SQL = "SELECT * FROM `categories` WHERE `active` = :active";
            $selectStatement = $this->pdo->prepare($SQL);
            $selectStatement->execute([
                ":active" => (int) 1
            ]);
            $categories = $selectStatement->fetchAll(PDO::FETCH_ASSOC);
            $this->pdo->commit();
            exit(json_encode(["categories" => $categories, "ok" => true]));
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }

    }

}