import xhrRequest from "../xhrRequest.js";

import horizontalProduct from "../../components/products/horizontalProduct.js";
import verticalProduct from "../../components/products/verticalProduct.js";
import emptyList from "../../components/products/emptyList.js";
import Product from "../../components/products/Product.js";
import emptyProduct from "../../components/products/emptyProduct.js";


export default class Products {

    /*
    * GET PRODUCT LIST AND SHOW BLOCKS
    * */
    static getProducts(category = null) {
        const productsList = document.getElementById("products-list");
        const products_grid_view = localStorage.getItem("products_grid_view");

        if(productsList){
            xhrRequest("POST", "/products/getProducts", {
                category: category,
                sort: EINIT.params.selectSort
            }).then(response => {

                products_grid_view === "vertical" ? productsList.classList.add("row") : productsList.classList.remove("row"); ;

                productsList.innerHTML = "";
                const products = response.products;

                EINIT.init.products = products;

                EINIT.params.productsCount = response.products_count;
                EINIT.params.maxProductsCount = response.max_products_count;
                EINIT.params.currentProducts = products.length;


                EINIT.getCurrentUrl()[0] ? this.createProductPagination(EINIT.params.productsCount) : null;

                let element = ``;
                if (products.length) {
                    for (let product of products) {
                        if(EINIT.getCurrentUrl()[0]) {
                            element +=  products_grid_view === "horizontal" ? horizontalProduct(product) : verticalProduct(product);
                        } else {
                            element += verticalProduct(product);
                        }
                    }
                } else {
                    element += emptyList();
                }

                productsList.innerHTML = productsList.innerHTML + element;

                if(!EINIT.getCurrentUrl()[0]) {
                    $(".slick-slider").slick({
                        accessibility: true,
                        infinite: true,
                        edgeFriction: 0.10,
                        mobileFirst: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    });
                }

            });
        }
    };

    /*
    * END PRODUCTS
    * */


    /*
    * GET PRODUCT DATA
    * */
    static getProduct(params) {
        const e_product_data = document.getElementById("e-product-data");
        if(e_product_data){
            xhrRequest("POST", "/products/getProductData", params)
                .then(response => {
                    const product = response.product;

                    if(!response.ok) {
                        e_product_data.innerHTML = emptyProduct(response.message);
                        return false;
                    }

                    EINIT.init.products = [product];
                    e_product_data.innerHTML = Product(product);
                });
        }
    }
    /*
    *  END PRODUCT DATA
    * */



    /*
    * GENERATE PAGINATION BLOCK
    * */
    static createProductPagination(products_count) {
        const products_pagination = document.getElementById("products-pagination");
        products_pagination.innerHTML = "";
        let pages = +Math.ceil(+products_count / +EINIT.params.maxProductsCount);


        if(EINIT.params.currentProducts >= EINIT.params.maxProductsCount) {
            products_pagination.classList.remove("hidden");

            let current_page = +EINIT.getUrlParam("page");
            EINIT.params.page = EINIT.getUrlParam("page") ? +EINIT.getUrlParam("page") : +EINIT.params.page;

            if (!EINIT.params.currentProducts || pages <= 1) {
                products_pagination.classList.add("hidden");
                return false;
            }

            let element = `<ul class="pagination justify-content-end">
                <li class="page-item ${current_page === 1 ? 'disabled' : ''}">
                    <a class="page-link" onclick="paginationRedirect(${current_page - 1})">Предыдущая</a>
                </li>`;


            for (let i = +current_page > 1 ? +current_page - 1 : +current_page ; i < +current_page + 4; i++) {

                element += `<li class="page-item ${current_page === i ? 'active' : ''}">
                            <a class="page-link"  onclick="paginationRedirect(${i})">${i}</a>
                        </li>`;
            }

            if(pages > 6) {
                element += `<span style="margin-top: 15px; padding: 0px 10px; font-weight: 600;">...</span>
                            <li class="page-item ${current_page === pages ? 'active' : ''}">
                                <a class="page-link"  onclick="paginationRedirect(${pages})">${pages}</a>
                            </li>`;
            }

            element += `<li class="page-item ${current_page === pages ? 'disabled' : ''}">
                        <a class="page-link" onclick="paginationRedirect(${current_page + 1})">Следующая</a>
                    </li>
                </ul>`;

            products_pagination.innerHTML = element;
        }
    };

    /*
    * END PAGINATION
    * */

}