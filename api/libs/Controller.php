<?php


namespace App\libs;

use App\libs\DB;

class Controller extends DB
{
    protected $pdo;
    protected $memcache;

    public function __construct()
    {
        $dbObject = new DB();
        $this->pdo = $dbObject->connect();
        $this->memcache = $dbObject->connectMemcache();
    }

}