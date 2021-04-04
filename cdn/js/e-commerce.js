const ECMR = {};
const API_URL = "http://api.e-commerce.loc";

window.addEventListener("load", function () {

    let selectorSort = document.getElementById('selectorSort');
    if (selectorSort) {
        selectorSort.addEventListener('change', function () {
            ECMR.changeParams("sort", document.getElementById('selectorSort').value);
            ECMR.loadProducts();
        });
    }

    let product_amount_from = document.getElementById('product_amount_from');
    if (product_amount_from) {
        document.getElementById('product_amount_from').addEventListener('change', function () {
            ECMR.changeParams("min", document.getElementById('product_amount_from').value);
            ECMR.loadProducts();
        });
    }

    let product_amount_to = document.getElementById('product_amount_to');
    if (product_amount_to) {
        product_amount_to.addEventListener('change', function () {
            ECMR.changeParams("max", document.getElementById('product_amount_to').value);
            ECMR.loadProducts();
        });
    }

    if (selectorSort) {
        selectorSort = selectorSort.getElementsByTagName('option');
        for (let sort of selectorSort) {
            if (sort.value === ECMR.getUrlParam("sort")) sort.selected = true;
        }
    }
});

(function (self) {

    self.DATA = {
        productsCount: 0,
        currentProducts: 0,
        maxProducts: 0,
        selectCategory: null,
        selectSort: "all",
        page: 1
    };

    self.load = function (category = null) {
        self.DATA.selectCategory = category;
        var sort;
        if (window.location.search.replace('?', '')) {
            sort = ECMR.mapUrlParams(window.location.search.replace('?', ''));
        }
        self.DATA.selectSort = sort ? sort : "all";
        self.getCategories();
        self.loadProducts();
    };

    self.getCategories = function () {

        const categoriesList = document.getElementById("categories-list");
        categoriesList.innerHTML = "";

        let xhr = new XMLHttpRequest();
        xhr.open("GET", API_URL + "/categories/getCategories");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);

                let categories = [];
                categories = self.buildTree(response.categories);
                self.DATA.categories = categories;
                self.generetaCategory(categories);

            }
        };

    };

    self.generetaCategory = function (categories) {
        categories.forEach((category, index) => {
            var element = self.generetaCategoryTree(category);

            if (category) {
                for (let c of category.children) {
                    var subelement = self.generetaCategoryTree(category.children);
                    element.innerHTML = element.innerHTML + subelement;
                }
            }

            document.getElementById("categories-list").innerHTML = document.getElementById("categories-list").innerHTML + element;
        });
    }

    self.generetaCategoryTree = function (category) {
        if (category.name) {
            let url_name = category.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + category.id.replace(/ /g, "");

            let element = `<div class="accordion-item">`;
            if (category.children && category.children.length) {
                element += `<h2 class="accordion-header" id="flush-heading-${category.id}">`;
                element += `<button class="accordion-button collapsed accordion-category-header" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${category.id}" aria-expanded="false" aria-controls="flush-collapse-${category.id}">`;
                element += category.name;
                element += `</button>`;
                element += `<h2>`;
                element += `<div id="flush-collapse-${category.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${category.id}">`;
                for (let i in category.children) {
                    element += self.generetaCategoryTree(category.children[i]);
                }
                element += `</div>`;
            } else {
                element += `<h2 class="accordion-header" id="flush-heading-${category.id}">`;
                element += `<a class="btn e-btn-transparent accordion-subcategory-header" href="/category/${url_name}" >`;
                element += category.name;
                element += `</a>`;
                element += `<h2>`;
            }
            element += `</div>`;

            return element;
        }
    };

    self.buildTree = function (data, options) {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent_id';
        var CHILDREN_KEY = options.childrenKey || 'children';

        var tree = [],
            childrenOf = {};
        var item, id, parentId;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            childrenOf[id] = childrenOf[id] || [];
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId != 0) {
                childrenOf[parentId] = childrenOf[parentId] || [];
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        }
        ;

        return tree;
    };

    self.getProducts = function (category = null) {

        const productsList = document.getElementById("products-list");
        document.getElementById("products-list").innerHTML = "";

        let form = new FormData();
        form.append("category", category);
        form.append("sort", JSON.stringify(self.DATA.selectSort));

        let xhr = new XMLHttpRequest();
        xhr.open("POST", API_URL + "/products/getProducts");
        xhr.send(form);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                let products = response.products;

                self.DATA.productsCount = response.products_count;
                self.DATA.maxProductsCount = response.max_products_count;
                self.DATA.currentProducts = response.products.length;
                self.createProductPagination(self.DATA.productsCount);

                if (products.length) {
                    for (let product of products) {
                        let product_image = product.image ? product.image : '//cdn.e-commerce.loc/images/no-image.png';
                        let url_name = "/product/" + product.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + product.id.replace(/ /g, "");

                        let element = `<div class="col-md-4">`;
                        element += `<div class="product-card block shadow-sm" onclick="window.location.href = '${url_name}'">`;
                        element += `<div class="product-preview">`;
                        element += `<div class="product-zoom-preview">`;
                        element += `<img type="image" src="${product_image}" class="product-image" width="200px" alt="${product.name}" style="max-height: 200px;" />`;


                        if (product.label_1) {
                            element += `<div class="product_labels item-list ">`;
                            element += `<div class="label2 product_label">${product.label_1}</div>`;
                            element += `</div>`;
                        }

                        if (+product.stock <= 0) {
                            element += `<div class="product_labels item-list">`;
                            element += `<div class="label1 product_label">Нет в наличии</div>`;
                            element += `</div>`;
                        }
                        element += `</div>`;
                        element += `</div>`;
                        element += `<div class="product-short-info">`;
                        element += `<div class="product-title" title="${product.name}">${product.name}</div>`;
                        element += `<div class="d-flex">`;
                        element += `<div class="product-price">$ ${product.price}</div>`;


                        element += `<div class="product-stars">`;
                        element += `<span class="star">`;
                        element += `<span class="material-icons">grade</span>`;
                        element += `</span>`;
                        element += `<span class="product-star-decription">`;
                        element += `<span class="product-star-description count">4.3</span>`;
                        element += `</span>`;
                        element += `</div>`;

                        element += `</div>`;

                        element += `</div></div></div>`;


                        productsList.innerHTML = productsList.innerHTML + element;
                    }
                } else {
                    let element = `<img src="//cdn.e-commerce.loc/images/emptycart.webp" class="empty-product-list image" alt="Products list empty">
                        <div class="empty-product-list title">Список товаров пуст..</div>
                        <div class="empty-product-list subtitle">Попробуйте отредактировать фильтр, это может помочь!</div>`;

                    productsList.innerHTML = productsList.innerHTML + element;
                }


            }
        }

    };

    self.createProductPagination = function (products_count) {
        const products_pagination = document.getElementById("products-pagination");
        products_pagination.innerHTML = "";
        products_pagination.classList.remove("hidden"); //MOVE IN GENERATE!

        let pages = +Math.ceil(products_count / self.DATA.maxProductsCount);
        let current_page = +self.getUrlParam("page");
        self.DATA.page = self.getUrlParam("page") ? +self.getUrlParam("page") : +self.DATA.page;

        if (!self.DATA.currentProducts || pages <= 1) {
            products_pagination.classList.add("hidden");
            return false;
        }

        let element = `<nav aria-label="Page navigation example">
            <ul class="pagination pagination-lg justify-content-end">
                <li class="page-item ${ current_page === 1 ? 'disabled' : '' }">
                    <a class="page-link" onclick="ECMR.paginationRedirect(${current_page - 1})">Предыдущая</a>
                </li>`;

        let visible_pcount = pages < 6 ? pages + 1 : 6;
        for (let i = 1; i < visible_pcount; i++) {

            element += `<li class="page-item ${ current_page === i ? 'active' : '' }">
                            <a class="page-link"  onclick="ECMR.paginationRedirect(${i})">${i}</a>
                        </li>`;
        }

        element += `<li class="page-item ${ current_page === pages ? 'disabled' : '' }">
                        <a class="page-link" onclick="ECMR.paginationRedirect(${current_page + 1})">Следующая</a>
                    </li>
                </ul>
            </nav>`;

        products_pagination.innerHTML = element;
    }

    self.paginationRedirect = function(page) {
        self.changeParams("page", page);
        self.loadProducts();
    }

    self.getProduct = function (params) {

        const e_product_image_preview = document.getElementById("e-product-image-preview");
        const e_product_name = document.getElementById("e-product-name");
        const e_product_short_description = document.getElementById("e-product-short-description");
        const e_product_description = document.getElementById("e-product-description");
        const e_product_price = document.getElementById("e-product-price");
        const e_product_label = document.getElementById("e-product-label");
        const e_product_stock_label = document.getElementById("e-product-stock-label");
        const e_product_gallery = document.getElementById("e-product-gallery");

        let form = new FormData();
        form.append("params", params);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", API_URL + "/products/getProductData");
        xhr.send(form);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                const product = response.product;

                let product_image = product.image ? product.image : '//cdn.e-commerce.loc/images/no-image.png';
                e_product_image_preview.setAttribute("src", product_image);
                e_product_image_preview.setAttribute("alt", product.name);
                e_product_name.innerHTML = product.name;
                e_product_short_description.innerHTML = product.short_description + e_product_short_description.innerHTML;

                e_product_description.innerHTML = e_product_description.innerHTML + product.description;
                e_product_price.innerHTML = "$ " + product.price;

                if (product.label_1) {
                    e_product_label.classList.remove("hidden");
                    e_product_label.innerText = product.label_1;
                }

                if (+product.stock <= 0) {
                    e_product_stock_label.classList.remove("hidden");
                    e_product_stock_label.innerHTML = `<div class="e-product-block stock-empty">Нет в наличии</div>`;
                } else {
                    e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-buy">Добавить в корзину</button>`;
                }

                if (product.gallery) {
                    e_product_gallery.classList.remove("hidden");
                    let images = product.gallery.split(";");
                    images.pop();
                    for (let i in images) {
                        product_image = images[i] ? images[i] : `//cdn.e-commerce.loc/images/no-image.png`;
                        let element = `<div class="e-product-gallery col-md-4" onclick="ECMR.toggleProductImage('${product_image}')">`;
                        element += `<img src="${product_image}" class="e-product-gallery-image" alt="${product.name}"/>`;
                        element += `</div>`;
                        e_product_gallery.innerHTML = e_product_gallery.innerHTML + element;
                    }
                }

            }
        }

    };

    self.toggleProductImage = function (image) {
        const e_product_image_preview = document.getElementById("e-product-image-preview");
        e_product_image_preview.setAttribute("src", image);
    }

    self.toggleProductDescription = function () {
        const e_product_description = document.getElementById("e-product-description");
        const btn_toggle_product_description = document.getElementById("btn_toggle_product_description");


        if (e_product_description.classList.contains("hidden")) {
            e_product_description.classList.remove("hidden");
            btn_toggle_product_description.innerText = "Скрыть описание";
        } else {
            e_product_description.classList.add("hidden");
            btn_toggle_product_description.innerText = "Показать больше";
        }

    };

    self.getUrlParam = function (name) {
        var s = window.location.search;
        s = s.match(new RegExp(name + '=([^&=]+)'));
        return s ? s[1] : self.DATA[name];
    };

    self.changeParams = function (prmName, value) {
        let res = '';
        let d = location.href.split("#")[0].split("?");
        let base = d[0];
        let query = d[1];
        if (query) {
            let params = query.split("&");
            for (let param of params) {
                let keyval = param.split("=");
                if (keyval[0] != prmName) {
                    res += param + '&';
                }
            }
        }
        res += prmName + '=' + value;
        history.pushState('', '', base + '?' + res);

        self.DATA.selectSort = self.mapUrlParams(res);

        return false;
    };

    self.loadProducts = function () {
        self.getProducts(self.DATA.selectCategory);
    };

    self.mapUrlParams = function (params) {
        let url_params = params.split("&");
        params = {};
        for (let i in url_params) {
            let temp_params = url_params[i].split("=");
            params[i] = {
                "name": temp_params[0],
                "param": temp_params[1]
            };
        }
        return params;
    }

    self.getBannerAdverts = function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", API_URL + "/adverts/getBannerAdverts");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);

                let adverts = [];

                if (response.adverts.length) {
                    response.adverts.forEach((advert, index) => {
                        let banner_active = index === 0 ? "active" : "";

                        let element = `<div class="carousel-item ${banner_active}" data-bs-interval="10000">`;
                        element += `<div class="row">`;
                        element += `<div class="col-md-6">`;
                        element += `<div class="banner-content">`;
                        element += `<img src="${advert.image}" class="d-block banner-image-1" height="500px" alt="${advert.title}">`;
                        element += `</div>`;
                        element += `</div>`;
                        element += `<div class="col-md-6">`;
                        element += `<div class="banner-content banner-content-desc">`;
                        element += `<div class="banner-title">`;
                        element += advert.title;
                        element += `</div>`;
                        element += `<div class="banner-description">`;
                        element += advert.description;
                        element += `</div>`;
                        element += `<div class="banner-button">`;
                        element += `<a href="${advert.url_redirect}" class="e-btn-banner">${advert.url_name}</a>`;
                        element += `</div>`;
                        element += `</div>`;
                        element += `</div>`;
                        element += `</div>`;
                        element += `</div>`;
                        document.getElementById("slider-items").innerHTML = document.getElementById("slider-items").innerHTML + element;
                    })
                }


            }
        };
    }

})(ECMR);