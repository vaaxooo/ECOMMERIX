<?php


namespace App\libs;

use App\libs\DB;
use App\libs\MCache;

class Controller
{
    protected $pdo;
    protected $memcache;

    protected $language;

    public function __construct()
    {
        $dbClass = new DB();
        $this->pdo = $dbClass->connect();
        $this->memcache = new MCache();
        $languageClass = new Language();
        $this->language = (object) $languageClass->connect();
    }

}