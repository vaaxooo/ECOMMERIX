<?php require_once("app/layouts/main/top.php"); ?>

    <div class="row mt-5 block shadow-sm">
        <div class="col-md-6 p-5">

            <div class="row">

                <div class="col-md-4 d-block">
                    <div class="e-product-gallery-left hidden" id="e-product-gallery"></div>
                </div>

                <div class="col-md-8 m-auto e-product-block-preview">
                    <div class="e-product-image">
                        <img
                            class="e-product-image-preview"
                            id="e-product-image-preview"/>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-md-6 p-5">
            <div class="e-product-block info">
                <div class="e-product-block title" id="e-product-name"></div>
                <div class="d-flex labels">
                    <div class="e-product-block label product-label hidden" id="e-product-label"></div>
                </div>
                <div class="e-product-block short-description" id="e-product-short-description">
                    <span class="e-product-block short-decription-more"
                          onclick="ECMR.toggleProductDescription()" id="btn_toggle_product_description">Показать больше</span>
                </div>
                <div class="e-product-block stars">
                    <span class="star">
                        <span class="material-icons">grade</span>
                    </span>
                    <span class="star">
                        <span class="material-icons">grade</span>
                    </span>
                    <span class="star">
                        <span class="material-icons">grade</span>
                    </span>
                    <span class="star">
                        <span class="material-icons">grade</span>
                    </span>
                    <span class="star">
                        <span class="material-icons">grade</span>
                    </span>
                    <span class="star-decription">
                        <span class="star-description count">132</span> отзывов
                    </span>
                </div>
                <div class="d-flex e-product-block control">
                    <div class="e-product-block price" id="e-product-price"></div>
                    <div class="e-product-block btn-buy" id="e-product-stock-label"></div>
                </div>
            </div>
        </div>

    </div>

    <pre class="row block shadow-sm hidden" id="e-product-description">
        <div class="e-product-description-title">Характеристика</div>
    </pre>

    <script>
        ECMR.getProduct(<?php if (isset($product)): echo "'{$product}'"; endif; ?>);
    </script>
<?php require_once("app/layouts/main/bottom.php"); ?>