<?php require_once ("app/layouts/top.php"); ?>



    <div class="card card-body mt-4 mb-5 mb-grid-gutter slider-home-banner carousel slide" data-ride="carousel" id="slider-items">
        <a class="carousel-control-prev" href="#slider-items" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#slider-items" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>


    <header class="section-heading heading-line mt-5 mb-2">
        <h4 class="title-section text-uppercase">Новинки</h4>
    </header>

    <div class="slick-slider slick-vertical row" id="products-list">
    </div>


    <header class="section-heading heading-line mt-5 mb-2">
        <h4 class="title-section text-uppercase">Популярные категории</h4>
    </header>

    <div class="categories-card row" id="categories-card"></div>

    <article class="mt-5 mb-5">
        <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/banners/ad-sm.png" class="w-100">
    </article>




    <div class="padding-bottom">

        <header class="section-heading heading-line">
            <h4 class="title-section text-uppercase">Статьи</h4>
        </header>

        <div class="row">
            <div class="col-md-3 col-sm-6 mt-2">
                <article class="card card-post">
                    <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/posts/1.jpg" class="card-img-top">
                    <div class="card-body">
                        <h6 class="title">Trade Assurance</h6>
                        <p class="small text-uppercase text-muted">Order protection</p>
                    </div>
                </article> <!-- card.// -->
            </div> <!-- col.// -->
            <div class="col-md-3 col-sm-6 mt-2">
                <article class="card card-post">
                    <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/posts/2.jpg" class="card-img-top">
                    <div class="card-body">
                        <h6 class="title">Pay anytime</h6>
                        <p class="small text-uppercase text-muted">Finance solution</p>
                    </div>
                </article> <!-- card.// -->
            </div> <!-- col.// -->
            <div class="col-md-3 col-sm-6 mt-2">
                <article class="card card-post">
                    <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/posts/3.jpg" class="card-img-top">
                    <div class="card-body">
                        <h6 class="title">Inspection solution</h6>
                        <p class="small text-uppercase text-muted">Easy Inspection</p>
                    </div>
                </article> <!-- card.// -->
            </div> <!-- col.// -->
            <div class="col-md-3 col-sm-6 mt-2">
                <article class="card card-post">
                    <img src="https://bootstrap-ecommerce.com/templates/alistyle-html/images/posts/4.jpg" class="card-img-top">
                    <div class="card-body">
                        <h6 class="title">Ocean and Air Shipping</h6>
                        <p class="small text-uppercase text-muted">Logistic services</p>
                    </div>
                </article> <!-- card.// -->
            </div> <!-- col.// -->
        </div> <!-- row.// -->

    </div>


<?php require_once ("app/layouts/bottom.php"); ?>