export default function horizontalProduct (product) {

    let image = product.image ? product.image : '//e-commerce.loc/public/assets/images/no-image.png';

    let url_redirect = "/p/" + product.name
                                        .replace(/[^a-zа-яё0-9\s]/gi, '-')
                                        .replace(/ /g, "-")
                                        .toLocaleLowerCase()
                                        + "-" + product.id.replace(/ /g, "");

    let label_1 = product.label_1 ? `<span class="badge badge-success"> ${product.label_1} </span>` : ``;

    let button = +product.stock === 0
                    ? `<button href="#" class="btn  btn-primary btn-sm disabled" data-translate="not_available"> <i class="fa fa-shopping-cart"></i></button>`
                    : `<button class="btn btn-sm btn-primary" onclick="quickProduct(${product.id})" data-translate="buy_now"> <i class="fa fa-shopping-cart"></i></button>`;

    let free_shipping = +product.free_shipping === 1 ? `<p class="small text-success vc-freeshipping" data-translate="free_shipping"> </p>` : ``;

    let wishlist_product = !checkWishlistProduct(product.id)
        ? `<span class="float-right wishlist-product color-grey" title="${EINIT.translate.add_to_wishlist}" onclick="wishlistProduct(${product.id})"><i class="fa fa-heart"></i></span>`
        : `<span class="float-right wishlist-product text-danger" title="${EINIT.translate.remove_from_wishlist}" onclick="wishlistProduct(${product.id})"><i class="fa fa-heart"></i></span>`;

    let discount = `<span class="badge badge-primary percent"> -20% </span>`;

    /*
    * BEGIN BLOCK
    * */

    let element = `<div class="col-md-4">
                        <figure class="card card-product-grid">
                            <div class="vertical-card-zoom">
                                <div class="img-wrap vertical-card-image">
                                    <img src="${image}" loading="lazy" class="image-zoom-preview-bl">
                                    <span class="topbar">
                                        ${free_shipping}
                                        ${label_1}
                                        ${wishlist_product}
                                    </span>
                                </div>
                            </div>
                            <figcaption class="info-wrap border-top">
                                <a href="${url_redirect}" class="title" title="${product.name}">${product.name.trunc(25)}</a>
                                <div class="price-wrap mt-2">
                                    <span class="price h5"> ₴ ${product.price} </span>
                                    <del class="price-old"> ₴ ${product.price}</del>
                                    ${discount}
                                </div>
                                <div class="buttons-wrap mt-4">
                                    ${button}
                                    <a href="${url_redirect}" class="btn btn-sm btn-light" data-translate="readmore"></a>
                                </div>
                            </figcaption>
                        </figure>
                   </div>`;
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