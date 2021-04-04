<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class Adverts extends Controller
{

    public function getBannerAdverts()
    {

        try {
            $this->pdo->beginTransaction();
            $SQL = "SELECT * FROM `adverts` WHERE `banner` = :banner AND `active` = :active";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->bindValue(":banner", (int) 1, PDO::PARAM_INT);
            $stmt->bindValue(":active", (int) 1, PDO::PARAM_INT);
            $stmt->execute();
            $adverts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }

        exit(json_encode(["adverts" => $adverts, "ok" => true]));
    }

}