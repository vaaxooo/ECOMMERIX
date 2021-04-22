<div class="card mb-3">
    <div class="card-body d-flex align-items-center">
        <nav class="flex-fill">
            <h5 class="m-auto">Сортировать</h5>
        </nav> <!-- col.// -->
        <div class="show form-inline">

            <select class="mr-2 form-control selectorSort" name="selectorSort" id="selectorSort">
                <option value="all">По умолчанию</option>
                <option value="price_ascending">По возрастающей цене</option>
                <option value="price_falling">По убывающей цене</option>
                <option value="name">По алфавиту (А-я)</option>
                <option value="created_at">По новизне</option>
            </select>

            <div class="btn-group">
                <button type="button" class="btn btn-light" title="" id="pgv-horizontal" onclick="changeGridViewProducts('horizontal')">
                    <i class="fa fa-bars"></i>
                </button>
                <button type="button" class="btn btn-light" title="" id="pgv-vertical" onclick="changeGridViewProducts('vertical')">
                    <i class="fa fa-th"></i>
                </button>
            </div>
        </div>

    </div>
</div>
