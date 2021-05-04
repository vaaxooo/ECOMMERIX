<?php

namespace App\libs;

use PDO;

class DB
{
    protected $pdo;

    /**
     * DB constructor.
     */
    public function connect()
    {
        $this->pdo = new PDO("mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8",
            $_ENV['DB_USER'], $_ENV['DB_PASS']);

        if (!$this->pdo) {
            exit("Database not connected!");
        }

        return $this->pdo;
    }

}