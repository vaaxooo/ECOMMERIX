<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class Products extends Controller
{

    public function getProducts()
    {

        $params = json_decode($_POST['sort'], true);

        if(is_array($params)){
            foreach ($params as $key => $value) {
                $params[$value["name"]] = $value["param"];
                unset($params[$key]);
            }
        }

        $category_name = isset($_POST['category']) ? (string)$_POST['category'] : NULL;
        $category_name = explode("-", $category_name);
        $category = (int)$category_name[count($category_name) - 1];

        $SQL_WHERE = [];

        try {
            $this->pdo->beginTransaction();
            $SQL = "SELECT * FROM `categories` WHERE `id` = :category";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->execute([
                ":category" => (string)$category
            ]);
            $category = $stmt->fetch(PDO::FETCH_ASSOC);
            $category ? array_push($SQL_WHERE, "`category_id` = {$category['id']}") : NULL;

            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollback();
        }

        $sort = isset($params["sort"]) ? (string)$params["sort"] : "all";
        $min = isset($params["min"]) ? (int)$params["min"] : NULL;
        $max = isset($params["max"]) ? (int)$params["max"] : NULL;
        $page = isset($params['page']) ? (int)$params['page'] : (int)1;

        $sort_list = array(
            'created_at' => 'DESC',
            'name' => 'ASC',
            'price' => 'ASC',
        );

        $method = array_key_exists($sort, $sort_list) ? $sort_list[$sort] : reset($sort_list);
        $min && $min > 0 ? array_push($SQL_WHERE, "`price` >= {$min}") : NULL;
        $max && $max > 0 ? array_push($SQL_WHERE, "`price` <= {$max}") : NULL;

        $QUERY_STRING = "";

        foreach ($SQL_WHERE as $key => $value) {
            $QUERY_STRING .= $key == (count($SQL_WHERE)) - 1 ? $value : $value . " AND " ;
        }


        $SQL = "SELECT * FROM `products`";
        $SQL .= " JOIN (SELECT `id` FROM `products` WHERE `active` = :active ORDER BY `id` LIMIT :offset, :limit) as p ON p.id = products.id";

        $QUERY_STRING ? $SQL .= " AND {$QUERY_STRING}" : NULL;
        $sort != "all" ? $SQL .= " ORDER BY {$sort} {$method}" : NULL;

        $limit = 21; //IMPORT VALUE FROM DB `site_settings`;
/*        SELECT * FROM `products`
                JOIN (SELECT `id` FROM `products` WHERE `active` = 1 ORDER BY `id` LIMIT 3, 3)
                    as p ON p.id = products.id WHERE `price` >= 300 ORDER BY `price` DESC;*/

        try {
            $this->pdo->beginTransaction();
            $stmt = $this->pdo->prepare($SQL);
            $stmt->bindValue(':active', (int) 1, PDO::PARAM_INT);
            $stmt->bindValue(':offset', (int) (($limit * $page) - $limit), PDO::PARAM_INT);
            $stmt->bindValue(':limit', (int) $limit, PDO::PARAM_INT);

            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $SQL = "SELECT * FROM `products` WHERE `active` = :active";
            $stmt = $this->pdo->prepare($SQL);
            $stmt->execute([
                ":active" => (int)1,
            ]);
            $products_count = $stmt->rowCount();
            $this->pdo->commit();
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }

        exit(json_encode(["products" => $products, "products_count" => $products_count, "max_products_count" => $limit, "ok" => true]));
    }


    public function getProductData()
    {
        $product_name = (string)$_POST['params'];
        $product_name = explode("-", $product_name);
        $product_id = (int)$product_name[count($product_name) - 1];

        try {
            $this->pdo->beginTransaction();
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

        !$product ? exit(json_encode(["products" => "Product not found!", "ok" => false])) : NULL;

        exit(json_encode(["product" => $product, "ok" => true]));
    }

}