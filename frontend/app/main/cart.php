<?php require_once("app/layouts/main/top.php"); ?>

    <div class="row mt-5 block shadow-none">
        <div class="block-title">Корзина</div>
        <div class="col-md-12" id="e-products-from-cart"></div>
    </div>


    <script>
        ECMR.getProductsFromCart();
    </script>
<?php require_once("app/layouts/main/bottom.php"); ?>