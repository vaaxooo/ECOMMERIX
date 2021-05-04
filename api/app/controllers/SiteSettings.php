<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class SiteSettings extends Controller
{

    public function getSerializeData()
    {
            $siteSettings = $this->get();

            $currencies = $this->memcache->cache("currencies");
            if (!$currencies) {
                $SQL = "SELECT currencies.code, currencies.name FROM currencies WHERE currencies.active = :active";
                $currencies = DBModel::Query($SQL, "all", [
                    ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
                ]);
                $this->memcache->cache("currencies", $currencies, "set", 1800);
            }

            $languages = $this->memcache->cache("languages");
            if (!$languages) {
                $SQL = "SELECT languages.code, languages.name FROM languages  WHERE languages.active = :active";
                $languages = DBModel::Query($SQL, "all", [
                    ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
                ]);
                $this->memcache->cache("languages", $languages, "set", 1800);
            }

            exit(json_encode([
                "data" => [
                    "web" => $siteSettings,
                    "currencies" => $currencies,
                    "languages" => $languages,
                    "language_translate" => json_encode($this->language)
                ],
                "ok" => true]));
    }

    /**
     * @return array|false|mixed|string
     */
    public function get()
    {
        $site_settings = $this->memcache->cache("site_settings");
        if (!$site_settings) {
            $SQL = "SELECT * FROM `site_settings` WHERE `id` = :id";
            $site_settings = DBModel::Query($SQL, "one", [
                ["key" => ":id", "value" => (int)1, "param" => PDO::PARAM_INT],
            ]);
            $this->memcache->cache("site_settings", $site_settings, "set", 1800);
        }

        !isset($_SESSION['language']) ? $_SESSION['language'] = $site_settings['default_language'] : null;
        !isset($_SESSION['currency']) ? $_SESSION['currency'] = $site_settings['default_currency'] : null;

        return $site_settings;
    }

}