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
        <div class="block-title">Сортировать по</div>
        <div class="price-range">

            <div class="form-group">
                <select class="form-control form-control-lg selectorSort" name="selectorSort" id="selectorSort">
                    <option value="all">Не сортировать</option>
                    <option value="price">Цена (по возрастанию)</option>
                    <option value="name">Алфавит (А-я)</option>
                    <option value="created_at">Новое</option>
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