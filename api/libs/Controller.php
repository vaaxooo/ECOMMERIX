<?php


namespace App\libs;

use App\libs\DB;

class Controller extends DB
{
    protected $pdo;

    public function __construct()
    {
        $dbObject = new DB();
        $this->pdo = $dbObject->connect();
    }

}