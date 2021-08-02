export default function horizontalProduct (product) {

    let image = product.image ? product.image : '//e-commerce.loc/public/assets/images/no-image.png';

    let url_redirect = "/p/" + product.name
                                        .replace(/[^a-zа-яё0-9\s]/gi, '-')
                                        .replace(/ /g, "-")
                                        .toLocaleLowerCase()
                                        + "-" + product.id.replace(/ /g, "");

    let label_1 = product.label_1 ? `<span class="badge badge-success"> ${product.label_1} </span>` : ``;

    let button = +product.stock === 0
                    ? `<button class="btn  btn-primary btn-block disabled" data-translate="not_available"> <i class="fa fa-shopping-cart"></i></button>`
                    : `<button class="btn btn-primary btn-block" onclick="quickProduct(${product.id})"> ${EINIT.translate.buy} <i class="fa fa-shopping-cart"></i> </button>`;

    let free_shipping = +product.free_shipping === 1 ? `<p class="small text-success"> ${EINIT.translate.free_shipping} </p>` : ``;

    let wishlist_product = !checkWishlistProduct(product.id)
                    ? `<span class="small wishlist-product" onclick="wishlistProduct(${product.id})"><i class="fa fa-heart"></i> <span data-translate="add_to_wishlist"></span></span>`
                    : `<span class="small wishlist-product text-danger" onclick="wishlistProduct(${product.id})"><i class="fa fa-heart"></i> <span data-translate="remove_from_wishlist"></span>`;

    let discount = `<span class="badge badge-primary percent"> -20% </span>`;

    /*
    * BEGIN BLOCK
    * */

    let element = `<article class="card card-product-list">
                <div class="card-body">
                    <div class="row">
                        <aside class="col-sm-3 image-zoom">
                            <a href="${url_redirect}" class="img-wrap image-zoom-preview">
                                ${label_1}
                                
                                <img src="${image}" loading="lazy" class="image-zoom-preview-bl">
                            </a>
                        </aside> <!-- col.// -->
                        <article class="col-sm-6 py-4">
                            <a href="${url_redirect}" class="title mt-2 h5" title="${product.name}">${product.name.trunc(60)}</a>
                            <div class="rating-wrap mb-3">
                                <ul class="rating-stars">
                                    <li style="width:0%" class="stars-active">
                                        <img src="//e-commerce.loc/public/assets/images/icons/stars-active.svg" alt="">
                                    </li>
                                    <li>
                                        <img src="//e-commerce.loc/public/assets/images/icons/starts-disable.svg" alt="">
                                    </li>
                                </ul>
                                <small class="label-rating text-muted">0 ${EINIT.translate.reviews}</small>
                                <small class="label-rating text-success">
                                    <i class="fa fa-clipboard-check"></i> 0 ${EINIT.translate.orders} </small>
                            </div>
                            
                            <p title="${product.short_description}">${product.short_description.trunc(255)}</p>

                        </article> <!-- col.// -->
                        <aside class="col-sm-3 py-4">
                            <div class="price-wrap mt-2">
                                <span class="price h5"> ₴ ${product.price} </span>
                                <del class="price-old"> ₴ ${product.price}</del>
                                ${discount}
                            </div> 

                            ${free_shipping}
                            <br>
                            <p>
                                ${button}
                                <a href="${url_redirect}" class="btn btn-light btn-block mt-2" data-translate="readmore"></a>
                            </p>
                            <br>
                            ${wishlist_product}
                        </aside>
                    </div>
                </div>
            </article>`;
    return element;
}

/*
* TRUNCATE STRING
* */
String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
    };
/* END */