<?php

namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Filters extends Controller
{

    public function getFilters($fid = null)
    {

        $default_language = isset($_SESSION['language']) ? $_SESSION['language'] : "EN";
        $language = isset($_POST['language']) ? $_POST['language'] : $default_language;

        $temp_filters = [];
        if (!$fid) {
            $SQL = "SELECT f.*, ft.default_translation, ft.translation, ft.language_code
                    FROM filters as f 
                    JOIN filters_translate as ft
                    ON f.name = ft.default_translation
                    AND ft.language_code = :language AND f.active = :active";

            $filters = DBModel::Query($SQL, "all", [
                ["key" => ":language", "value" => (string)$language, "param" => PDO::PARAM_STR],
                ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ]);


            $SQL = "SELECT fa.*, ft.default_translation, ft.translation, ft.language_code
                    FROM filters_attributes as fa
                    JOIN filters_translate as ft
                    ON fa.option_value = ft.default_translation
                    AND ft.language_code = :language";

            $filters_attributes = DBModel::Query($SQL, "all", [
                ["key" => ":language", "value" => (string)$language, "param" => PDO::PARAM_STR],
            ]);


            foreach ($filters as &$filter) {
                $filter = (object)$filter;

                foreach ($filters_attributes as &$attribute) {
                    $attribute = (object)$attribute;
                    if ($attribute->filter_attributes_id == $filter->id) {
                        if (array_key_exists($filter->id, $temp_filters)) {
                            array_push($temp_filters[$filter->id]['options'],
                                [$attribute->option_key => $attribute->translation]);
                        } else {
                            $temp_filters[$filter->id] = [
                                "name" => strtolower($filter->name),
                                "translation" => (string)$filter->translation,
                                "type" => (string)$filter->type,
                                "options" => [[(string)$attribute->option_key => (string)$attribute->translation]]
                            ];
                        }
                    }
                }
            }

        } else {
            $SQL = "SELECT cf.category_id, cf.filter_id, fa.filter_attributes_id, fa.option_value, fa.option_key, ft.default_translation, ft.translation, ft.language_code, f.name, f.type, f.active
                        FROM categories_filters as cf 
                        JOIN filters as f ON cf.filter_id = f.id 
                        JOIN filters_attributes as fa ON fa.filter_attributes_id = cf.filter_id 
                        JOIN filters_translate as ft ON cf.category_id = :filter_id 
                        AND ft.language_code = :language AND f.active = :active";


            $filters = DBModel::Query($SQL, "all", [
                ["key" => ":filter_id", "value" => (int)$fid, "param" => PDO::PARAM_INT],
                ["key" => ":language", "value" => (string)$language, "param" => PDO::PARAM_STR],
                ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ]);


            foreach ($filters as &$filter) {
                $filter = (object)$filter;

                $filter->name_translation = $filter->name == $filter->default_translation ? $filter->translation : null;
                $filter->option_value_translation = $filter->option_value == $filter->default_translation ? $filter->translation : null;


                if (array_key_exists($filter->filter_id, $temp_filters)) {
                    if ($filter->option_value_translation) {
                        array_push($temp_filters[$filter->filter_id]['options'],
                            [$filter->option_key => $filter->option_value_translation]);
                    }
                } else {
                    if ($filter->name_translation) {
                        $temp_filters[$filter->filter_id] = [
                            "name" => strtolower($filter->name),
                            "translation" => (string)$filter->name_translation,
                            "type" => (string)$filter->type,
                            "options" => [[(string)$filter->option_key => (string)$filter->option_value_translation]]
                        ];
                    }
                }

            }

            foreach ($temp_filters as $key => &$value) {
                $value["options"] = array_slice($value["options"], 1);
                $temp_filters[$key] = $value;
            }

        }

        return $temp_filters;
    }

}