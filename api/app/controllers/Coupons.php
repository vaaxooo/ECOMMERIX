<?php


namespace App\controllers;

use App\libs\Controller;
use PDO;

class Coupons extends Controller
{

    public function checkCoupon()
    {
        $coupon_name = json_decode($_POST['params'], true);

        if (!$coupon_name) {
            exit(json_encode(["ok" => false, "message" => "Отсутствует название купона!"]));
        }

        $SQL = "SELECT * FROM `coupons` WHERE `name` = :coupon_name";

        try {
            $this->pdo->beginTransaction();
            $stmt = $this->pdo->prepare($SQL);
            $stmt->execute([
               ':coupon_name' => (string) $coupon_name
            ]);

            $coupon = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->pdo->commit();

            $message = !empty($coupon) ? "Купон применён!" : "Купон не существует!";

            exit(json_encode(["ok" => true, "message" => $message, "coupon" => $coupon['percent']]));
        } catch (\Exception $exception) {
            $this->pdo->rollBack();
        }


    }

}