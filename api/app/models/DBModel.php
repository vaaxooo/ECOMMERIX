<?php

namespace App\models;

use App\libs\DB;
use PDO;

class DBModel extends DB
{
    static protected $pdo_connection;

    /**
     * REQUIRE CONNECTION DB
     * @return PDO|void
     */
    public function connect()
    {
        $dbClass = new DB();
        self::$pdo_connection = $dbClass->connect();
    }

    /**
     * DATABASE CREATE QUERY REQUEST
     * @param $SQL
     * @param string $method
     * @param null $binds
     * @return array|mixed
     */
    public static function Query($SQL, $method = "all", $binds = null)
    {
        $dbClass = new DB();
        self::$pdo_connection = $dbClass->connect();
        try {
            self::$pdo_connection->beginTransaction();
            $stmt = self::$pdo_connection->prepare($SQL);
            if ($binds) {
                foreach ($binds as $key => &$value) {
                    $stmt->bindParam($value["key"], $value["value"], $value["param"]);
                }
            }
            $stmt->execute();
            $response = $method == "all" ? $stmt->fetchAll(PDO::FETCH_ASSOC) : $stmt->fetch(PDO::FETCH_ASSOC);
            self::$pdo_connection->commit();
            return $response;
        } catch (\Exception $exception) {
            self::$pdo_connection->rollback();
        }
    }


}