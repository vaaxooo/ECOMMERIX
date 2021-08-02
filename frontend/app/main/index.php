<?php require_once("app/layouts/top.php"); ?>

    <div class="card card-body mt-4 mb-5 mb-grid-gutter slider-home-banner carousel slide" data-ride="carousel"
         id="slider-items">
        <a class="carousel-control-prev" href="#slider-items" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#slider-items" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>


    <div id="homepage-newproducts">
        <header class="section-heading heading-line mt-5 mb-2">
            <h4 class="title-section text-uppercase" data-translate="newproducts"></h4>
            <a href="/products/newproducts" class="title-link" rel="nofollow" data-translate="all_newproducts"></a>
        </header>

        <div class="slick-slider slick-horizontal homepage-slider-products row" id="products-list">
        </div>
    </div>

    <div id="homepage-categories">
        <header class="section-heading heading-line mt-5 mb-2">
            <h4 class="title-section text-uppercase" data-translate="popular_categories"></h4>
        </header>

        <div class="slick-slider slick-horizontal homepage-slider-categories row" id="categories-card"></div>
    </div>

    <article class="mt-5 mb-5">
        <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/banners/ad-sm.png" class="w-100">
    </article>


    <div class="padding-bottom" id="homepage-articles">

        <header class="section-heading heading-line">
            <h4 class="title-section text-uppercase" data-translate="new_articles"></h4>
        </header>

        <div class="row" id="articles-list"></div>

    </div>


<?php require_once("app/layouts/bottom.php"); ?>