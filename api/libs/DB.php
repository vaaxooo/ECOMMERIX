<?php

namespace App\libs;

use Memcached;
use PDO;
use Memcache;

class DB
{
    protected $pdo;
    protected $memcache;

    public function connect()
    {
        $this->pdo = new PDO("mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};charset=utf8",
            $_ENV['DB_USER'], $_ENV['DB_PASS']);

        if (!$this->pdo) {
            exit("Database not connected!");
        }

        return $this->pdo;
    }

    public function connectMemcache()
    {
        $this->memcache = new Memcache();
        $this->memcache->addServer($_ENV['MEMCACHE_HOST'], $_ENV['MEMCACHE_PORT']);

        if (!$this->memcache) {
            exit("Memcache not connected!");
        }

        return $this->memcache;
    }

}