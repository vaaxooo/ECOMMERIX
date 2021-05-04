/* FUNCTIONS */
import Products from "./products/Products.js";
import Routes from "../Routes.js";

/* COMPONENTS */
import Wishlist from "../components/shopping/Wishlist.js";
import emptyFC from "../components/shopping/emptyFC.js";
import Cart from "../components/shopping/Cart.js";
import CartTable from "../components/shopping/CartTable.js";
import CartCheckout from "../components/shopping/CartCheckout.js";
import Toast from "../components/blocks/Toast.js";


window.addEventListener("load", function () {


    document.body.classList.add('loaded');

    /*
    * SET SELECTSORT
    * */
    var sort;
    if (window.location.search.replace('?', '')) {
        sort = EINIT.mapUrlParams(window.location.search.replace('?', ''));
    }

    EINIT.params.selectSort = sort ? sort : "all";
    /*
    * END
    * */

    localStorage.getItem("products_grid_view")
        ? localStorage.getItem("products_grid_view")
        : localStorage.setItem("products_grid_view", "horizontal");
    let products_grid_view = localStorage.getItem("products_grid_view");


    /**
     * HEADER WISHLIST AND CART COUNT
     */
    let fp_count = JSON.parse(localStorage.getItem("wishlist_products")) ? JSON.parse(localStorage.getItem("wishlist_products")).length : 0;
    document.getElementById("header-wishlist-count").innerHTML = fp_count;

    let cp_count = JSON.parse(localStorage.getItem("cart_products")) ? JSON.parse(localStorage.getItem("cart_products")).length : 0;
    document.getElementById("header-cart-count").innerHTML = cp_count;
    /* END */

    /**
     * GET CART OR WISHLIST PRODUCT LIST
     * @param type
     * @returns {boolean}
     */
    window.getFCProducts = function getFCProducts(type = "wishlist") {
        const elementBlock = type === "wishlist"
            ? document.getElementById("e-wishlist-products")
            : document.getElementById("e-cart-products");
        elementBlock.innerHTML = "";

        if (elementBlock) {
            let lcProducts = type === "wishlist"
                ? JSON.parse(localStorage.getItem("wishlist_products"))
                : JSON.parse(localStorage.getItem("cart_products"));

            let element = ``;
            if (lcProducts && lcProducts.length > 0) {
                EINIT.init.products = lcProducts;
                for (let product of lcProducts) {
                    element += type === "wishlist" ? Wishlist(product) : Cart(product);
                }
                if (type === "cart") {
                    elementBlock.innerHTML = elementBlock.innerHTML + CartTable(element);
                    const e_shopping_cart_product_price = elementBlock.querySelectorAll("#e-shopping-cart-product-price");
                    let amount = 0;
                    for (let priceElement of e_shopping_cart_product_price) {
                        amount = +amount + +priceElement.innerHTML;
                    }
                    elementBlock.innerHTML = elementBlock.innerHTML + CartCheckout(amount);
                } else {
                    elementBlock.innerHTML = elementBlock.innerHTML + element
                }
                return false;
            }

        }
        elementBlock.innerHTML = elementBlock.innerHTML + emptyFC(type);
        return false;
    }

    /**
     * CHECK PRODUCT ON CART
     * @param product_id
     * @returns {boolean}
     */
    window.checkCartProduct = function checkCartProduct(product_id) {
        let cart_products = JSON.parse(localStorage.getItem("cart_products"));

        if (cart_products) {
            for (let i = 0; i < cart_products.length; i++) {
                if (+cart_products[i].id === +product_id) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * CHECK PRODUCT ON FAVORITE
     * @param product_id
     * @returns {boolean}
     */
    window.checkWishlistProduct = function checkWishlistProduct(product_id) {
        let wishlist_products = JSON.parse(localStorage.getItem("wishlist_products"));

        if (wishlist_products) {
            for (let i = 0; i < wishlist_products.length; i++) {
                if (+wishlist_products[i].id === +product_id) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
     * REMOVE PRODUCT FROM CART OR WISHLIST LIST
     * @param product
     * @param type
     * @returns {boolean}
     */
    window.removeFCProducts = function removeFCProducts(product, type = "wishlist") {
        const elementBlock = type === "wishlist"
            ? document.getElementById("header-wishlist-count")
            : document.getElementById("header-cart-count");
        if (elementBlock) {
            let lcProducts = type === "wishlist"
                ? JSON.parse(localStorage.getItem("wishlist_products"))
                : JSON.parse(localStorage.getItem("cart_products"));


            if (lcProducts.length > 0) {
                for (let i = 0; i < lcProducts.length; i++) {
                    if (type === "wishlist") {
                        if (+lcProducts[i].id === +product) {
                            lcProducts = lcProducts.filter(item => +item.id !== +product)
                            localStorage.setItem("wishlist_products", JSON.stringify(lcProducts));

                            elementBlock.innerHTML = +elementBlock.innerHTML - 1;
                        }
                    } else {
                        if (lcProducts[i].cart_id === product) {
                            lcProducts = lcProducts.filter(item => item.cart_id !== product)
                            localStorage.setItem("cart_products", JSON.stringify(lcProducts));

                            elementBlock.innerHTML = +elementBlock.innerHTML - 1;
                        }
                    }

                }
                getFCProducts(type);
            }
        }
        return false;
    }

    /*
    * END
    * */


    /*
    *  TRIGGER CATEGORY CHANGE
    * */
    Routes();
    Products.getProducts(EINIT.params.selectCategory);
    /*
    * END
    *  */


    /*
    * TRIGGER FILTER CATEGORIES
    * */
    let filter_categories_checkbox = document.querySelectorAll("input[type=checkbox] #filter-categories-checkbox");
    if (filter_categories_checkbox) {
        filter_categories_checkbox.onchange = function () {
            console.log(filter_categories_checkbox);
            let checked_categories = [];
            for (let input of filter_categories_checkbox) {
                if (input.checked) {
                    checked_categories.concat(input.value);
                }
            }
            console.log(checked_categories);
        }
    }
    /*
    * END FILTER
    * */

    /*
    * PAGINATION PRODUCTS
    * */
    window.paginationRedirect = function paginationRedirect(page) {
        window.location.href = "#products-list";
        EINIT.changeParams("page", page);
        Products.getProducts(EINIT.params.selectCategory);
    };
    /*
    * END PAGINATION
    * */

    /*
    * CHANGE GRID VIEW PRODUCT LIST
    * */
    const temp_grid_view = document.getElementById("pgv-" + products_grid_view);
    if (temp_grid_view) {
        temp_grid_view.classList.add("active");
        temp_grid_view.setAttribute("disabled", "disabled");
        window.changeGridViewProducts = function changeGridViewProducts(type) {
            products_grid_view = localStorage.getItem("products_grid_view");
            if (products_grid_view !== type && products_grid_view) {
                document.getElementById("pgv-" + products_grid_view).classList.remove("active");
                document.getElementById("pgv-" + products_grid_view).removeAttribute("disabled");
                document.getElementById("pgv-" + type).classList.add("active");
                document.getElementById("pgv-" + type).setAttribute("disabled", "disabled");

                localStorage.setItem("products_grid_view", type);
                Products.getProducts(EINIT.params.selectCategory);
            }
        }
    }

    /*
    * END CHANGE GRID VIEW
    * */

    /**
     * CHANGE PREVIEW IMAGE
     * @param image
     */
    window.changePreviewImage = function changePreviewImage(image) {
        const e_product_image_gbox = document.getElementById("e-product-image-gbox");
        const e_product_image_preview = document.getElementById("e-product-image-preview");
        e_product_image_preview.setAttribute("src", image);
        e_product_image_gbox.removeAttribute("href");
        e_product_image_gbox.setAttribute("href", image);
    };


    /*
     * ADD PRODUCT IN FAVORITE CARD
     * @param product_id
     * @param type
     * @returns {boolean}
     */
    window.wishlistProduct = function wishlistProduct(product_id, type = null) {
        const wishlist_count = document.getElementById("header-wishlist-count");
        let inpTarget = event.currentTarget;
        let wishlist_products = JSON.parse(localStorage.getItem("wishlist_products"));
        type = type ? type : localStorage.getItem("products_grid_view");

        let product = EINIT.init.products.filter(item => +item.id === +product_id)[0];

        if (product) {
            if (wishlist_products) {

                for (let i = 0; i < wishlist_products.length; i++) {
                    if (+wishlist_products[i].id === +product.id) {
                        wishlist_products = wishlist_products.filter(item => +item.id !== +product.id)
                        localStorage.setItem("wishlist_products", JSON.stringify(wishlist_products));
                        inpTarget.classList.remove("text-danger");

                        if (type === "productInfo") {
                            inpTarget.classList.remove("btn-outline-danger");
                            inpTarget.classList.add("btn-light");
                            inpTarget.setAttribute("title", EINIT.translate.add_to_wishlist);
                        }

                        type === "horizontal" ? inpTarget.innerHTML = `<i class="fa fa-heart"></i> <span>${EINIT.translate.add_to_wishlist}</span>` : null;
                        wishlist_count.innerHTML = +wishlist_count.innerHTML - 1;

                        type === "cart" ? getFCProducts("cart") : null;

                        return false;
                    }
                }

                if (wishlist_products[0] === "[]") {
                    localStorage.removeItem("wishlist_products");
                    return false;
                }

                let temp_products = {};
                temp_products = wishlist_products.concat(product);

                wishlist_count.innerHTML = +wishlist_count.innerHTML + 1;
                localStorage.setItem("wishlist_products", JSON.stringify(temp_products));

                inpTarget.classList.add("text-danger");

                if (type === "productInfo") {
                    inpTarget.classList.add("btn-outline-danger");
                    inpTarget.classList.remove("text-danger");
                    inpTarget.classList.remove("btn-light");
                    inpTarget.setAttribute("title", EINIT.translate.remove_from_wishlist);
                }

                type === "cart" ? getFCProducts("cart") : null;
                type === "horizontal" ? inpTarget.innerHTML = `<i class="fa fa-heart"></i> <span>${EINIT.translate.remove_from_wishlist}</span>` : null;
            } else {
                localStorage.setItem("wishlist_products", JSON.stringify([product]));
                inpTarget.classList.add("text-danger");

                if (type === "productInfo") {
                    inpTarget.classList.add("btn-outline-danger");
                    inpTarget.classList.remove("text-danger");
                    inpTarget.classList.remove("btn-light");
                    inpTarget.setAttribute("title", EINIT.translate.remove_from_wishlist);
                }

                wishlist_count.innerHTML = +wishlist_count.innerHTML + 1;
                type === "cart" ? getFCProducts("cart") : null;
                type === "horizontal" ? inpTarget.innerHTML = `<i class="fa fa-heart"></i> <span>${EINIT.translate.remove_from_wishlist}</span>` : null;
            }

        }
        return false;
    }


    /**
     * ADD PRODUCT IN CART CARD
     * @param product_id
     * @param type
     * @returns {boolean}
     */
    window.cartProduct = function cartProduct(product_id, type = null) {
        const cart_count = document.getElementById("header-cart-count");
        let inpTarget = event.currentTarget;
        let cart_products = JSON.parse(localStorage.getItem("cart_products"));
        type = type ? type : localStorage.getItem("products_grid_view");

        let product = EINIT.init.products.filter(item => +item.id === +product_id)[0];

        if (!product.selectedAttributes) {
            product.selectedAttributes = [];
        }

        if (product && product.stock > 0) {

            if (type === "productInfo") {
                if (product.attributes) {
                    if (product.attributes.length !== product.selectedAttributes.length) {
                        Toast(EINIT.translate.oops, EINIT.translate.not_selected_attributes);
                        return false;
                    }
                }
            }

            let products_count = 0;
            if (cart_products) {
                let products_list = cart_products.filter(item => +item.id === +product.id);
                products_list ? products_list.filter(item => products_count = +products_count + +item.count) : null;
            }

            product.count = 1;

            let date = new Date();
            date = date.getHours() + date.getMinutes() + date.getSeconds() + date.getDay() + date.getMonth() + date.getFullYear();
            product.cart_id = product_id + "_" + date;

            if (+products_count < +product.stock) {
                if (cart_products) {

                    let temp_products = {};
                    temp_products = cart_products.concat(product);

                    cart_count.innerHTML = +cart_count.innerHTML + 1;
                    localStorage.setItem("cart_products", JSON.stringify(temp_products));
                    Toast(EINIT.translate.notification, EINIT.translate.products_added_to_cart);
                } else {
                    localStorage.setItem("cart_products", JSON.stringify([product]));
                    cart_count.innerHTML = +cart_count.innerHTML + 1;
                    Toast(EINIT.translate.notification, EINIT.translate.products_added_to_cart);
                }

                resetProductAttributes();
                product.selectedAttributes = [];
            } else {
                Toast(EINIT.translate.notification, EINIT.translate.cant_add_product);
            }

        }
        return false;
    }


    /**
     * REMOVE PRODUCTS FROM SHOPPING CART
     * @param product_id
     * @param type
     * @returns {boolean}
     */
    window.removeProductFromCart = function removeProductFromCart(product_id, type = null) {
        const cart_count = document.getElementById("header-cart-count");

        let inpTarget = event.currentTarget;
        let cart_products = JSON.parse(localStorage.getItem("cart_products"));
        type = type ? type : localStorage.getItem("products_grid_view");

        for (let i = 0; i < cart_products.length; i++) {
            if (+cart_products[i].id === +product_id) {
                cart_products = cart_products.filter(item => +item.id !== product_id)
                localStorage.setItem("cart_products", JSON.stringify(cart_products));
                inpTarget.setAttribute("onclick", `cartProduct(${product_id}, '${type}')`);
                inpTarget.setAttribute("title", EINIT.translate.add_to_cart);
                type === "horizontal"
                    ? inpTarget.innerHTML = `Добавить в корзину <i class="fa fa-shopping-cart"></i>`
                    : inpTarget.innerHTML = `<i class="fa fa-shopping-cart">`;
                cart_count.innerHTML = +cart_count.innerHTML - 1;
                return false;
            }
        }

        if (cart_products[0] === "[]") {
            localStorage.removeItem("cart_products");
            return false;
        }

        return false;
    }

    /**
     * CHANGE CART COUNT PRODUCTS
     * @param product
     * @param method
     * @returns {boolean}
     */
    window.changeProductCount = function changeProductCount(product, method) {

        let cart_products = localStorage.getItem("cart_products");
        cart_products = JSON.parse(cart_products);

        if (cart_products.length > 0) {


            for (let i = 0; i < cart_products.length; i++) {
                if (cart_products[i].cart_id === product) {
                    let prod = cart_products[i];

                    let products_list = cart_products.filter(item => +item.id === +prod.id);
                    let products_count = 0;
                    products_list ? products_list.filter(item => products_count = +products_count + +item.count) : null;

                    if (method === "increment") {
                        if (prod.count < prod.stock && products_count < prod.stock) {
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
        getFCProducts("cart");
        return false;
    };

    /**
     * OPEN MODAL
     * @param content
     */
    window.openModal = function openModal(content) {
        const modal = document.getElementById("modal");
        modal.innerHTML = "";

        document.querySelector("body").classList.add("modal-open");
        modal.innerHTML = `<div class="modal fade show" tabindex="-1" style="display: block;" aria-modal="true" role="dialog">
                              <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    
                                  <div class="modal-body">
                                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeModal()"></button>
                                       ${content}
                                  </div>
                                </div>
                              </div>
                            </div>`;
    }

    /**
     * CLOSE MODAL
     */
    window.closeModal = function closeModal() {
        const modal = document.getElementById("modal");
        document.querySelector("body").classList.remove("modal-open");
        modal.innerHTML = "";
    }


});





/* FILTERS */
import "./filters/Filters.js";

/* HOOKS */
import './coupons/hooks.js';
import './products/hooks.js';
import './web/hooks.js';