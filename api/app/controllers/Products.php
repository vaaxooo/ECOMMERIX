<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Products extends Controller
{


    /**
     * GET PRODUCTS FROM ALL SUBCATEGORIES / SUBPARENTS / PARENTS
     * @param $category_id
     * @return array
     */
    public function reqursive($category_id) {
        $SQL = "SELECT * FROM `categories` JOIN (SELECT `id` FROM `categories` WHERE `parent_id` = :category) as c ON c.id = categories.id";
        $categories = DBModel::Query($SQL, "all", [
            ["key" => ":category", "value" => (int)$category_id, "param" => PDO::PARAM_INT],
        ]);
        return $categories;
    }

    /**
     * FILTER AND SORT + GET PRODUCT LIST
     */
    public function getProducts()
    {

        if(isset($_POST['params'])) {

            $params = json_decode($_POST['params'], true);
            $params_sort = $params['sort'];

            if(is_array($params_sort)){
                foreach ($params_sort as $key => $value) {
                    $params_sort[$value["name"]] = $value["param"];
                    unset($params_sort[$key]);
                }
            }
        }


        $colors = isset($params_sort['colors']) ? urldecode($params_sort['colors']) : NULL;
        $sizes = isset($params_sort['sizes']) ? urldecode($params_sort['sizes']) : NULL;
        $category_name = isset($params['category']) ? (string)$params['category'] : NULL;
        $sort = isset($params_sort["sort"]) ? (string)$params_sort["sort"] : "all";
        $min = isset($params_sort["min"]) ? (int)$params_sort["min"] : NULL;
        $max = isset($params_sort["max"]) ? (int)$params_sort["max"] : NULL;
        $page = isset($params_sort['page']) ? (int)$params_sort['page'] : (int)1;

        $fcontroller = new Filters();
        $filters = $fcontroller->getFilters();

        if(!empty($category_name)){
            $category_name = explode("-", $category_name);
            $category = (int)$category_name[count($category_name) - 1];
        }else {
            $category = NULL;
        }

        $sort_list = array(
            'created_at' => 'DESC',
            'name' => 'ASC',
            'price_ascending' => 'ASC',
            'price_falling' => 'DESC',
        );

        $method = array_key_exists($sort, $sort_list) ? $sort_list[$sort] : reset($sort_list);
        $sort = $sort == 'price_ascending' || $sort == 'price_falling' ? 'price' : $sort;
        /*
         * END ENCODE PARAMS
         * */


        /*
         * CREATE QUERY
         * */
        $SQL = "SELECT * FROM `products` WHERE `active` = :active";
        /* END */

        /*
         * CATEGORY FILTER TREE
         * */
        if($category){
            $SQL_CATEGORY = "SELECT * FROM `categories` WHERE `id` = :category";

            $category = DBModel::Query($SQL_CATEGORY, "one", [
                ["key" => ":category", "value" => (int)$category, "param" => PDO::PARAM_INT],
            ]);

            if($category['type'] == "parent") {

                $filters = $fcontroller->getFilters($category['id']);
                $categories = $this->reqursive($category['id']);

                if(!empty($categories)) {
                    $cid = "";
                    foreach($categories as $key => &$c) {
                        if($c['type'] == "subparent"){
                            $categories_req = $this->reqursive($c['id']);
                            foreach ($categories_req as $key => &$c) {
                                $cid .= $c['id'].",";
                            }
                        }
                        $cid .= $c['id'].",";
                    }

                    //Приводит строку в порядок "Удаляет ', '" => "Разбивает на массив и удаляет повторяющиеся значения" => "Возвращает ', '"
                    $cid = join(", ", array_unique(explode(",", mb_substr($cid, 0, -1))));

                    $SQL .= " AND `category_id` IN ({$cid})";
                }else {
                    $category ? $SQL .= " AND `category_id` = {$category['id']}" : NULL;
                }
            }else{
                if($category){
                    $filters = $fcontroller->getFilters($category['id']);
                    $SQL .= " AND `category_id` = {$category['id']}";
                }
            }
        }
        /* END */

        /*
         * FILTERS
         * */
        $min && $min > 0 ? $SQL .= " AND `price` >= {$min}" : NULL;
        $max && $max > 0 ? $SQL .= " AND `price` <= {$max}" : NULL;

        $sql_filter = "";
        if(!empty($colors) && $colors != "[]") {
            $colors = ltrim($colors, "[");
            $colors = trim($colors, "]");
            $sql_filter = $colors;
        }

        if(!empty($sizes) && $sizes != "[]") {
            $sizes = ltrim($sizes, "[");
            $sizes = trim($sizes, "]");
            $sql_filter != "" ? $sql_filter .= ",".$sizes : $sql_filter = $sizes ;
        }

        $sql_filter != "" ? $SQL .= " AND `id` 
                                    IN (SELECT products_filter_attributes.product_id 
                                    FROM products_filter_attributes 
                                    WHERE products_filter_attributes.attribute 
                                    IN ({$sql_filter}))" : NULL;
        $sort != "all" ? $SQL .= " ORDER BY {$sort} {$method}" : NULL;
        /*
         * END FILTERS
         * */

        $web = new \App\controllers\SiteSettings();
        $limit = $web->get()['product_pagination'];


        $products_count = (int) DBModel::Query(str_replace("*", "COUNT(*) as products_count", $SQL), "one", [
            ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
        ])['products_count'];

        $SQL .= " LIMIT :offset, :limit";
        $products = DBModel::Query($SQL, "all", [
            ["key" => ":active", "value" => (int)1, "param" => PDO::PARAM_INT],
            ["key" => ":offset", "value" => (int)(($limit * $page) - $limit), "param" => PDO::PARAM_INT],
            ["key" => ":limit", "value" => (int)$limit, "param" => PDO::PARAM_INT],
        ]);

        exit(json_encode(["products" => $products, "products_count" => $products_count, "max_products_count" => $limit, "filters" => $filters, "ok" => true]));
    }

    /*
     * END PRODUCT LIST
     * */


    /*
     * GET PRODUCT DATA
     * */
    public function getProductData()
    {
        $product_name = (string)$_POST['params'];
        $product_name = explode("-", $product_name);
        $product_id = (int)$product_name[count($product_name) - 1];

        try {
            $this->pdo->beginTransaction();

            /* SELECT PRODUCT DATA */
            $SQL = "SELECT * FROM `products` WHERE `id` = :product_id AND `active` = :active";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->bindValue(":product_id", (int)$product_id, PDO::PARAM_INT);
            $stmt->bindValue(":active", (int)1, PDO::PARAM_INT);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollback();
        }

        !$product ? exit(json_encode(["message" => "" , "ok" => false])) : NULL;

        exit(json_encode(["product" => $product, "ok" => true]));
    }
    /*
     * END GET PRODUCT DATA
     * */

}