<div class="card mb-3">
    <div class="card-body d-flex align-items-center">
        <nav class="flex-fill">
            <div class="btn-group">
                <button type="button" class="btn btn-light" title="" id="pgv-horizontal" onclick="changeGridViewProducts('horizontal')">
                    <i class="fa fa-bars"></i>
                </button>
                <button type="button" class="btn btn-light" title="" id="pgv-vertical" onclick="changeGridViewProducts('vertical')">
                    <i class="fa fa-th"></i>
                </button>
            </div>
        </nav> <!-- col.// -->
        <div class="show form-inline">

            <select class="mr-2 form-control selectorSort" name="selectorSort" id="selectorSort">
                <option value="all" data-translate="selectsort_default"></option>
                <option value="price_ascending" data-translate="selectsort_price_ascending"></option>
                <option value="price_falling" data-translate="selectsort_price_falling"></option>
                <option value="name" data-translate="selectsort_name"></option>
                <option value="created_at" data-translate="selectsort_created_at"></option>
            </select>


        </div>

    </div>
</div>
