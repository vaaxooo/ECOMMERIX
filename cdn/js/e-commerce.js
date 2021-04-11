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

    let fp_count = JSON.parse(localStorage.getItem("favorite_products")) ? JSON.parse(localStorage.getItem("favorite_products")).length : 0;
    document.getElementById("favorite-products-count").innerHTML = fp_count;

    let cp_count = JSON.parse(localStorage.getItem("cart_products")) ? JSON.parse(localStorage.getItem("cart_products")).length : 0;
    document.getElementById("cart-products-count").innerHTML = cp_count;

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

    self.temp_shapes;

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
                        element += `<img type="image" src="${product_image}" loading="lazy" class="product-image" width="200px" alt="${product.name}" style="max-height: 200px;" />`;

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
                        element += `<div class="product-price"> ₴ ${product.price}</div>`;


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
                    let element = `<img src="//cdn.e-commerce.loc/images/emptycart.png" class="empty-product-list image" alt="Products list empty">
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
                <li class="page-item ${current_page === 1 ? 'disabled' : ''}">
                    <a class="page-link" onclick="ECMR.paginationRedirect(${current_page - 1})">Предыдущая</a>
                </li>`;

        let visible_pcount = pages < 6 ? pages + 1 : 6;
        for (let i = 1; i < visible_pcount; i++) {

            element += `<li class="page-item ${current_page === i ? 'active' : ''}">
                            <a class="page-link"  onclick="ECMR.paginationRedirect(${i})">${i}</a>
                        </li>`;
        }

        element += `<li class="page-item ${current_page === pages ? 'disabled' : ''}">
                        <a class="page-link" onclick="ECMR.paginationRedirect(${current_page + 1})">Следующая</a>
                    </li>
                </ul>
            </nav>`;

        products_pagination.innerHTML = element;
    }

    self.paginationRedirect = function (page) {
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
        const e_product_image_gbox = document.getElementById("e-product-image-gbox");
        const e_product_favorite = document.getElementById("e-product-favorite");
        const e_product_shape = document.getElementById("e-product-shape");

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
                e_product_name.setAttribute("title", product.name);
                e_product_name.innerHTML = product.name.trunc(50);
                e_product_short_description.innerHTML = product.short_description + e_product_short_description.innerHTML;
                e_product_image_gbox.setAttribute("href", product_image);

                let shape = product.shape;
                if (shape) {
                    shape = shape.split(";");

                    for (let i = 0; i < shape.length - 1; i++) {
                        let element = `<div class="favorite-product shape" onclick="ECMR.selectProductShape('${shape[i]}')" data-name="${shape[i]}">
                                            ${shape[i]}
                                        </div>`;
                        e_product_shape.innerHTML = e_product_shape.innerHTML + element;
                    }
                }

                e_product_favorite.setAttribute("onclick", `ECMR.favoriteProduct(${JSON.stringify(product)})`);

                if (product.stock > 0) {
                    e_product_stock_label.setAttribute("onclick", `ECMR.cartProduct(${JSON.stringify(product)})`);
                }

                e_product_description.innerHTML = e_product_description.innerHTML + product.description;
                e_product_price.innerHTML = "₴ " + product.price;

                if (product.label_1) {
                    e_product_label.classList.remove("hidden");
                    e_product_label.innerText = product.label_1;
                }

                if (product.gallery !== "" && product.gallery !== null) {
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

                self.checkFavoriteProduct(product);
                self.checkCartProduct(product);

            }
        }

    };

    self.selectProductShape = function (shape) {
        const e_product_shape = document.getElementById("e-product-shape");
        inputShape = e_product_shape.getElementsByTagName('div');
        for (let input of inputShape) {
            if (input.dataset.name === shape){
                input.classList.add("selected");
            }else {
                input.classList.remove("selected");
            }
        }
        self.temp_shapes = shape;
    }

    self.checkFavoriteProduct = function (product) {
        const e_product_favorite = document.getElementById("e-product-favorite");
        let favorite_products = localStorage.getItem("favorite_products");
        favorite_products = JSON.parse(favorite_products);

        if (favorite_products) {
            for (let i = 0; i < favorite_products.length; i++) {
                if (+favorite_products[i].id === +product.id) {
                    e_product_favorite.innerHTML = `<span class="material-icons favorite">favorite</span>`;
                    return true;
                }
            }
        }

        return false;
    };

    self.favoriteProduct = function (product) {

        const favorite_products_count = document.getElementById("favorite-products-count");
        const e_product_favorite = document.getElementById("e-product-favorite");
        let favorite_products = localStorage.getItem("favorite_products");
        favorite_products = JSON.parse(favorite_products);

        product.shape = self.temp_shapes;

        if (favorite_products) {

            for (let i = 0; i < favorite_products.length; i++) {
                if (+favorite_products[i].id === +product.id) {
                    e_product_favorite.innerHTML = `<span class="material-icons">favorite_border</span>`;
                    favorite_products = favorite_products.filter(item => +item.id !== +product.id)
                    localStorage.setItem("favorite_products", JSON.stringify(favorite_products));

                    favorite_products_count.innerHTML = +favorite_products_count.innerHTML - 1;

                    return false;
                }
            }

            if (favorite_products[0] === "[]") {
                localStorage.removeItem("favorite_products");
                return false;
            }

            let temp_products = {};
            temp_products = favorite_products.concat(product);

            favorite_products_count.innerHTML = +favorite_products_count.innerHTML + 1;
            localStorage.setItem("favorite_products", JSON.stringify(temp_products));
            e_product_favorite.innerHTML = `<span class="material-icons favorite">favorite</span>`;
        } else {
            favorite_products_count.innerHTML = +favorite_products_count.innerHTML + 1;
            localStorage.setItem("favorite_products", JSON.stringify([product]));
            e_product_favorite.innerHTML = `<span class="material-icons favorite">favorite</span>`;
        }

    };

    self.checkCartProduct = function (product) {
        const e_product_stock_label = document.getElementById("e-product-stock-label");
        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products) {
            for (let i = 0; i < cart_products.length; i++) {
                if (+cart_products[i].id === +product.id) {
                    e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-remove-cart">Удалить из корзины</button>`;
                    return true;
                }
            }
        }

        if (+product.stock <= 0) {
            e_product_stock_label.classList.remove("hidden");
            e_product_stock_label.innerHTML = `<div class="e-product-block stock-empty">Нет в наличии</div>`;
        } else {
            e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-add-cart">Добавить в корзину</button>`;
        }

        return false;

    };

    self.checkCartFavoriteProduct = function (product) {
        const e_product_stock_label = document.getElementById("e-product-stock-label");
        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products) {
            for (let i = 0; i < cart_products.length; i++) {
                if (+cart_products[i].id === +product.id) {
                    return true;
                }
            }
        }

        return false;

    };

    self.cartProduct = function (product) {

        const cart_products_count = document.getElementById("cart-products-count");
        const e_product_stock_label = document.getElementById("e-product-stock-label");
        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);


        product.count = 1;
        product.shape = self.temp_shapes;

        if (cart_products) {

            for (let i = 0; i < cart_products.length; i++) {
                if (cart_products[i].id === product.id) {
                    e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-add-cart">Добавить в корзину</button>`;
                    cart_products = cart_products.filter(item => item.id !== product.id)
                    localStorage.setItem("cart_products", JSON.stringify(cart_products));

                    cart_products_count.innerHTML = +cart_products_count.innerHTML - 1;

                    return false;
                }
            }

            if (cart_products[0] === "[]") {
                localStorage.removeItem("cart_products");
                return false;
            }

            let temp_products = {};
            temp_products = cart_products.concat(product);

            cart_products_count.innerHTML = +cart_products_count.innerHTML + 1;
            localStorage.setItem("cart_products", JSON.stringify(temp_products));
            e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-remove-cart">Удалить из корзины</button>`;
        } else {
            cart_products_count.innerHTML = +cart_products_count.innerHTML + 1;
            localStorage.setItem("cart_products", JSON.stringify([product]));
            e_product_stock_label.innerHTML = `<button type="submit" class="btn btn-lg btn-product-remove-cart">Удалить из корзины</button>`;
        }

    };

    self.toggleProductImage = function (image) {
        const e_product_image_gbox = document.getElementById("e-product-image-gbox");
        const e_product_image_preview = document.getElementById("e-product-image-preview");
        e_product_image_preview.setAttribute("src", image);
        e_product_image_gbox.removeAttribute("href");
        e_product_image_gbox.setAttribute("href", image);
    };

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
    };


    self.getFavoriteProducts = function () {
        const e_favorite_products = document.getElementById("e-favorite-products");
        e_favorite_products.innerHTML = "";
        let favorite_products = localStorage.getItem("favorite_products");
        favorite_products = JSON.parse(favorite_products);

        if (favorite_products.length > 0) {
            for (let product of favorite_products) {
                let url_name = "/product/" + product.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + product.id.replace(/ /g, "");

                let element = `<div class="block favorite-product row">
                <div class="col-md-2 favorite-product image">
                    <img src="${product.image}" class="image-preview" alt="${product.name}" />
                </div>
                <div class="col-md-3 favorite-product short-description">
                    <div class="favorite-product name" title="${product.name}">
                        ${product.name}
                    </div>`;

                if (product.shape) {
                    element += `<div class="favorite-product crits">
                        ${product.shape}
                    </div>`;
                }

                element += `</div>      
                <div class="col-md-2 favorite-product price">
                    ₴ ${product.price}
                </div>
                <div class="col-md-2 favorite-product control">
                    <a class="favorite-product button-control text-danger" title="Удалить из избранного" onclick="ECMR.removeFavoriteProduct(${product.id})">
                        <span class="material-icons">clear</span>
                    </a>
                    <a href="${url_name}" class="favorite-product button-control" title="Перейти к товару" target="_blank">
                        <span class="material-icons">visibility</span>
                    </a>`;
                element += `</div></div>`;
                e_favorite_products.innerHTML = e_favorite_products.innerHTML + element;
            }
            return false;
        }

        let element = `<div class="favorite-product empty">
                <img src="//cdn.e-commerce.loc/images/emptycart.png" class="empty-product-list image" alt="Products list empty">
                <div class="empty-product-list title">Вы еще не добавляли товары в Избранное!</div>
            </div>`;
        e_favorite_products.innerHTML = e_favorite_products.innerHTML + element;

    };


    self.getProductsFromCart = function () {
        const e_products_from_cart = document.getElementById("e-products-from-cart");
        e_products_from_cart.innerHTML = "";
        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products.length > 0) {
            let price = 0;
            for (let product of cart_products) {
                let url_name = "/product/" + product.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + product.id.replace(/ /g, "");
                price = +price + (+product.price * +product.count);
                let element = `<div class="block favorite-product row">
                <div class="col-md-2 favorite-product image">
                    <img src="${product.image}" class="image-preview" alt="${product.name}" />
                </div>
                <div class="col-md-3 favorite-product short-description">
                    <div class="favorite-product name" title="${product.name}">
                        ${product.name}
                    </div>`;

                if (product.shape) {
                    element += `<div class="favorite-product crits">
                        ${product.shape}
                    </div>`;
                }

                element += `</div>
                <div class="col-md-2 favorite-product counts">
                    <button class="favorite-product button-counts" onclick="ECMR.changeCountProductCart(${product.id}, 'decrement')">
                        <span class="material-icons">remove</span>
                    </button>
                    <div class="favorite-product count">${product.count}</div>
                    <button class="favorite-product button-counts" onclick="ECMR.changeCountProductCart(${product.id}, 'increment')">
                        <span class="material-icons">add</span>
                    </button>
                </div>
                <div class="col-md-2 favorite-product price">
                    ₴ ${+product.price * +product.count}
                </div>
                <div class="col-md-2 favorite-product control">
                    <a class="favorite-product button-control text-danger" title="Удалить из корзины" onclick="ECMR.removeProductFromCart(${product.id})">
                        <span class="material-icons">delete</span>
                    </a>
                    <a href="${url_name}" class="favorite-product button-control" title="Перейти к товару" target="_blank">
                        <span class="material-icons">visibility</span>
                    </a>`;
                element += `</div></div>`;
                e_products_from_cart.innerHTML = e_products_from_cart.innerHTML + element;
            }

            let element = `<div class="cart-sum-to-pay">
                                <span class="cart-sum">
                                    <small>Сумма к оплате:</small> <b>₴ ${price}</b>
                                </span>
                                <button type="button" class="btn btn-lg btn-product-add-cart">Перейти к оплате</button>
                            </div>`;
            e_products_from_cart.innerHTML = e_products_from_cart.innerHTML + element;
            return false;
        }

        let element = `<div class="favorite-product empty">
                <img src="//cdn.e-commerce.loc/images/emptycart.png" class="empty-product-list image" alt="Products list empty">
                <div class="empty-product-list title">Вы еще не добавляли товары в Корзину!</div>
            </div>`;
        e_products_from_cart.innerHTML = e_products_from_cart.innerHTML + element;

    };

    self.removeFavoriteProduct = function (product) {
        const favorite_products_count = document.getElementById("favorite-products-count");
        let favorite_products = localStorage.getItem("favorite_products");
        favorite_products = JSON.parse(favorite_products);
        if (favorite_products.length > 0) {
            for (let i = 0; i < favorite_products.length; i++) {
                if (+favorite_products[i].id === +product) {
                    favorite_products = favorite_products.filter(item => +item.id !== +product)
                    localStorage.setItem("favorite_products", JSON.stringify(favorite_products));

                    favorite_products_count.innerHTML = +favorite_products_count.innerHTML - 1;
                }
            }
        }
        self.getFavoriteProducts();
        return false;
    };

    self.changeCountProductCart = function (product, method) {

        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products.length > 0) {
            for (let i = 0; i < cart_products.length; i++) {
                if (+cart_products[i].id === +product) {
                    let prod = cart_products[i];
                    if (method === "increment") {
                        if (prod.count < prod.stock) {
                            prod.count = prod.count + 1;
                        }
                    } else {
                        if (prod.count > 1) {
                            prod.count = prod.count - 1;
                        }
                    }

                    localStorage.setItem("cart_products", JSON.stringify(cart_products));
                }
            }
        }
        self.getProductsFromCart();
        return false;
    };

    self.removeProductFromCart = function (product) {

        const cart_products_count = document.getElementById("cart-products-count");
        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products.length > 0) {
            for (let i = 0; i < cart_products.length; i++) {
                if (+cart_products[i].id === +product) {
                    cart_products = cart_products.filter(item => +item.id !== +product)
                    localStorage.setItem("cart_products", JSON.stringify(cart_products));

                    cart_products_count.innerHTML = +cart_products_count.innerHTML - 1;
                }
            }
        }
        self.getProductsFromCart();
        return false;
    };

    self.http_request = function (method = "GET", URL = null, params = {}) {


        return new Promise((resolve, reject) => {
            let form = new FormData();
            form.append("params", JSON.stringify(params));

            const xhr = new XMLHttpRequest();
            xhr.open(method, API_URL + URL);
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(form);
        });

    };

})(ECMR);


String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };