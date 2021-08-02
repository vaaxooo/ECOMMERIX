<?php


namespace App\controllers;

use App\libs\Controller;
use App\models\DBModel;
use PDO;

class Coupons extends Controller
{

    /**
     * CHECK $_POST COUPON ON VALIDATE
     */
    public function checkCoupon()
    {

        $coupon_name = json_decode($_POST['params'], true);

        if (!$coupon_name) {
            exit(json_encode(["ok" => false, "message" => $this->language->input_coupon_name_empty]));
        }

        $SQL = "SELECT * FROM `coupons` WHERE `name` = :coupon_name";
        $coupon = DBModel::Query($SQL, "one", [
            ["key" => ":coupon_name", "value" => (string)$coupon_name, "param" => PDO::PARAM_STR],
        ]);

        $message = !empty($coupon) ? $this->language->coupon_applied : $this->language->coupon_not_found;

        exit(json_encode(["ok" => true, "message" => $message, "coupon" => (int)$coupon['percent']]));

    }

}