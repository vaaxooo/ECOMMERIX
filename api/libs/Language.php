<?php

namespace App\libs;

class Language
{
    public $language;

    public function connect()
    {

        $default_language = isset($_SESSION['language']) ? $_SESSION['language'] : "EN";
        $language_code = isset($_POST['language'])
            ? $_POST['language']
            : $default_language;

        $language_file = __DIR__ . "/../config/languages/{$language_code}.json";

        try {
            $language = file_exists($language_file) ? @file_get_contents($language_file)
                : file_get_contents(__DIR__ . "/../config/languages/{$default_language}.json");
        } catch (\Exception $exception) {
            return false;
        }

        return (object)json_decode($language);
    }

}