<?php require_once("app/layouts/main/top.php"); ?>


    <div class="row mt-5 block shadow-sm">
        <div class="col-md-4">

            <?php require_once ("app/layouts/main/components/products/filter-selection.php"); ?>

        </div>

        <div class="col-md-8 mb-5">
            <div class="row" id="products-list"></div>
            <?php require_once ("app/layouts/main/components/products/pagination.php"); ?>
        </div>

    </div>

<script>
    ECMR.load(<?php if(isset($category)): echo "'{$category}'"; endif; ?>);
</script>
<?php require_once("app/layouts/main/bottom.php"); ?>