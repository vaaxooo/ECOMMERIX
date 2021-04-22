<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class Products extends Controller
{


    /*
     * reqursive - GET PRODUCTS FROM ALL SUBCATEGORIES / SUBPARENTS / PARENTS
     * */

    public function reqursive($category_id) {
        $SQL = "SELECT * FROM `categories` JOIN (SELECT `id` FROM `categories` WHERE `parent_id` = :category) as c ON c.id = categories.id";
        $stmt = $this->pdo->prepare($SQL);
        $stmt->execute([
            ":category" => (int)$category_id
        ]);
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $categories;
    }

    /*
     * FILTER AND SORT + GET PRODUCT LIST
     * */
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


        $category_name = isset($params['category']) ? (string)$params['category'] : NULL;
        if(!empty($category_name)){
            $category_name = explode("-", $category_name);
            $category = (int)$category_name[count($category_name) - 1];
        }else {
            $category = NULL;
        }

        $SQL_WHERE = [];
        $SQL_WHERE_OR = [];

        try {
            $this->pdo->beginTransaction();
            $SQL = "SELECT * FROM `categories` WHERE `id` = :category";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->execute([
                ":category" => (string)$category
            ]);
            $category = $stmt->fetch(PDO::FETCH_ASSOC);

            if($category['type'] == "parent") {

                $categories = $this->reqursive($category['id']);

                if(!empty($categories)) {
                    $cid = "";
                    foreach($categories as $key => $c) {
                        if($c['type'] == "subparent"){
                            $categories_req = $this->reqursive($c['id']);
                            foreach ($categories_req as $key => $c) {
                                $cid .= $c['id'].",";
                            }
                        }
                        $cid .= $c['id'].",";
                    }

                    //Приводит строку в порядок "Удаляет ', '" => "Разбивает на массив и удаляет повторяющиеся значения" => "Возвращает ', '"
                    $cid = join(", ", array_unique(explode(",", mb_substr($cid, 0, -1))));

                    array_push($SQL_WHERE, "`category_id` IN ({$cid})");
                }else {
                    $category ? array_push($SQL_WHERE, "`category_id` = {$category['id']}") : NULL;
                }
            }else{
                $category ? array_push($SQL_WHERE, "`category_id` = {$category['id']}") : NULL;
            }

            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollback();
        }

        $sort = isset($params_sort["sort"]) ? (string)$params_sort["sort"] : "all";
        $min = isset($params_sort["min"]) ? (int)$params_sort["min"] : NULL;
        $max = isset($params_sort["max"]) ? (int)$params_sort["max"] : NULL;
        $page = isset($params_sort['page']) ? (int)$params_sort['page'] : (int)1;

        $sort_list = array(
            'created_at' => 'DESC',
            'name' => 'ASC',
            'price_ascending' => 'ASC',
            'price_falling' => 'DESC',
        );

        $method = array_key_exists($sort, $sort_list) ? $sort_list[$sort] : reset($sort_list);
        $min && $min > 0 ? array_push($SQL_WHERE, "`price` >= {$min}") : NULL;
        $max && $max > 0 ? array_push($SQL_WHERE, "`price` <= {$max}") : NULL;
        $sort = $sort == 'price_ascending' || $sort == 'price_falling' ? 'price' : $sort;

        $QUERY_STRING = "";

        foreach ($SQL_WHERE as $key => $value) {
            $QUERY_STRING .= $key == (count($SQL_WHERE)) - 1 ? $value : $value . " AND " ;
        }



        $SQL = "SELECT * FROM `products`";
        $SQL .= " JOIN (SELECT `id` FROM `products` WHERE `active` = :active ORDER BY `id`) as p ON p.id = products.id";

        $QUERY_STRING ? $SQL .= " AND {$QUERY_STRING}" : NULL;
        $sort != "all" ? $SQL .= " ORDER BY {$sort} {$method}" : NULL;


        $web = new \App\models\SiteSettings();
        $limit = $web->get()['product_pagination'];

        try {
            $this->pdo->beginTransaction();

            $stmt = $this->pdo->prepare($SQL);
            $stmt->execute([
                ":active" => (int)1,
            ]);
            $products_count = $stmt->rowCount();

            $SQL .= " LIMIT :offset, :limit";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->bindValue(':active', (int) 1, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int) (($limit * $page) - $limit), PDO::PARAM_INT);
            $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);

            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }

        exit(json_encode(["products" => $products, "products_count" => $products_count, "max_products_count" => $limit, "ok" => true]));
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

        !$product ? exit(json_encode(["message" => "Товар не существует!", "ok" => false])) : NULL;

        exit(json_encode(["product" => $product, "ok" => true]));
    }
    /*
     * END GET PRODUCT DATA
     * */

}