<?php

namespace App\libs;

use Memcached;
use Memcache;

class MCache
{

    protected $memcache;

    /**
     * MCache constructor.
     */
    public function __construct()
    {
        $this->memcache = new Memcache();
        $this->memcache->addServer($_ENV['MEMCACHE_HOST'], $_ENV['MEMCACHE_PORT']);

        if (!$this->memcache) {
            exit("Memcache not connected!");
        }
    }

    /**
     * SET OR GET CACHE PARAMS
     * @param $name
     * @param $params
     * @param $method
     * @param int $time
     * @return mixed
     */
    public function cache($name, $params = [], $method = "get", $time = 1800) {
        if($_ENV['MEMCACHE'] == "true"){
            if($method == "get") {
                $res = $this->memcache->get($name);
                return $res;
            } else if($method == "set") {
                $this->memcache->set($name, $params, MEMCACHE_COMPRESSED, time() + $time);
            }
        }
        return $params;
    }

}