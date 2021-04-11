<?php require_once("app/layouts/main/top.php"); ?>

    <div class="row mt-5 block shadow-none">
        <div class="block-title">Избранное</div>
        <div class="col-md-12" id="e-favorite-products"></div>

    </div>


<script>
    ECMR.getFavoriteProducts();
</script>
<?php require_once("app/layouts/main/bottom.php"); ?>