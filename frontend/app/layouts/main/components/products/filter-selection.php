<div class="block shadow-none ">
    <div class="block shadow-none mt-0">
        <div class="block-title">Цена</div>
        <div class="price-range">

            <div class="form-group">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="От" value="<?php if(isset($_GET['min'])): echo $_GET['min']; endif; ?>" id="product_amount_from" required/>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <hr>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="До" value="<?php if(isset($_GET['max'])): echo $_GET['max']; endif; ?>" id="product_amount_to" required/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="block shadow-none mt-0">
        <div class="block-title">Сортировка</div>
        <div class="price-range">

            <div class="form-group">
                <select class="form-control form-control-lg selectorSort" name="selectorSort" id="selectorSort">
                    <option value="all">По умолчанию</option>
                    <option value="price_ascending">По возрастающей цене</option>
                    <option value="price_falling">По убывающей цене</option>
                    <option value="name">По алфавиту (А-я)</option>
                    <option value="created_at">По новизне</option>
                </select>
            </div>
        </div>
    </div>

</div>

<div class="block shadow-none">

    <div class="block shadow-none mt-0">
        <div class="block-title">Категории</div>

        <div class="accordion accordion-flush" id="categories-list">
        </div>

    </div>
</div>

<div class="block shadow-none">
    <a href="/">
        <img src="//cdn.e-commerce.loc/images/banner-2.jpg" width="100%" />
    </a>
</div>