<?php require_once ("app/layouts/top.php"); ?>

    <div class="row mt-5 mb-5">

        <div class="col-md-3">
            <?php require_once ("app/layouts/components/products/filter.php"); ?>
        </div>

        <div class="col-md-9">

            <?php require_once ("app/layouts/components/products/sorting.php"); ?>

            <div class="card-product-list" id="products-list"></div>

            <div id="products-pagination"></div>

        </div>

    </div>


<?php require_once ("app/layouts/bottom.php"); ?>