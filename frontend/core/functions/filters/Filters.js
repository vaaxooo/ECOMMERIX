import Products from "../products/Products.js";

window.addEventListener("load", function () {
    /**
     * DYNAMIC SET FILTER IN URL ADDRESS
     * @param filter
     */
    window.setFilter = function setFilter(filter) {
        const attribute = event.currentTarget;
        const attributeName = attribute.dataset.attributeName;
        filter = filter.toLowerCase();


        var params = EINIT.getUrlParam(filter) ? EINIT.getUrlParam(filter) : null;
        params = JSON.parse(decodeURI(params));

        if (!params) {
            params = [];
        }

        var temp_params = [];
        if (attribute.checked) {
            temp_params = params;
            temp_params.push(attributeName);
            EINIT.changeParams(filter, JSON.stringify(temp_params));
        } else {
            temp_params = params.filter(item => item !== attributeName);
            EINIT.changeParams(filter, JSON.stringify(temp_params));
        }

        Products.getProducts(EINIT.params.selectCategory);
    }

    /**
     * CHECK FILTER ATTRIBUTE ON CHECKED
     * @param filter
     * @param attribute
     * @returns {boolean}
     */
    window.checkFilterAttribue = function checkFilterAttribue(filter, attribute) {
        filter = filter.toLowerCase();
        let params = EINIT.getUrlParam(filter) ? EINIT.getUrlParam(filter) : null;
        params = JSON.parse(decodeURI(params));
        let response = params ? params.includes(attribute) ? true : false : false;

        return response;
    }

    /**
     * REMOVE FILTER ATTRIBUTE FROM URL ADDRESS
     * @param filter
     * @returns {boolean}
     */
    window.clearFilter = function clearFilter(filter) {
        const inputAttributes = document.querySelectorAll('.filter-' + filter);
        filter = filter.toLowerCase();

        if (!inputAttributes) {
            return false;
        }

        for (let input of inputAttributes) {
            EINIT.changeParams(filter, JSON.stringify([]));
            input.checked = false;
        }
        Products.getProducts(EINIT.params.selectCategory);

    }


    /**
     * Watches the sort change
     * @type {HTMLElement}
     */
    let selectorSort = document.getElementById('selectorSort');
    if (selectorSort) {

        selectorSort.onchange = function () {
            EINIT.changeParams("sort", document.getElementById('selectorSort').value);
            Products.getProducts(EINIT.params.selectCategory);
        }
    }

    /**
     * Monitors the change in the minimum price
     * @type {HTMLElement}
     */
    let product_amount_from = document.getElementById('product_amount_from');
    if (product_amount_from) {
        product_amount_from.value = EINIT.getUrlParam("min") ? EINIT.getUrlParam("min") : "";
        product_amount_from.onchange = function () {
            EINIT.changeParams("min", document.getElementById('product_amount_from').value);
            Products.getProducts(EINIT.params.selectCategory);
        };
    }

    /**
     * Monitors the change in the maximum price
     * @type {HTMLElement}
     */
    let product_amount_to = document.getElementById('product_amount_to');
    if (product_amount_to) {
        product_amount_to.value = EINIT.getUrlParam("max") ? EINIT.getUrlParam("max") : "";
        product_amount_to.onchange = function () {
            EINIT.changeParams("max", document.getElementById('product_amount_to').value);
            Products.getProducts(EINIT.params.selectCategory);
        };
    }

    /**
     * Monitors the change in the range price
     * @type {HTMLElement}
     */
    let product_range_price = document.getElementById('product-range-price');
    if (product_range_price) {
        product_range_price.value = product_amount_from.value;
        product_range_price.onchange = function () {
            product_amount_from.value = product_range_price.value;
            product_amount_to.value = 999999;
            EINIT.changeParams("min", document.getElementById('product_amount_from').value);
            EINIT.changeParams("max", document.getElementById('product_amount_to').value);
            Products.getProducts(EINIT.params.selectCategory);
        };
    }


    /**
     * SELECT OPTION BY URL PARAMS
     */
    if (selectorSort) {
        selectorSort = selectorSort.getElementsByTagName('option');
        for (let isort of selectorSort) {
            if (isort.value === EINIT.getUrlParam("sort")) isort.selected = true;
        }
    }

});