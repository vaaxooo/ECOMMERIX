export default function Favorites(product) {
    let image = product.image ? product.image : '//e-commerce.loc/public/assets/images/no-image.png';
    let url_redirect = "/product/" + product.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + product.id.replace(/ /g, "");

    let label_1 = product.label_1 ? `<span class="badge badge-success"> ${product.label_1} </span>` : ``;
    let free_shipping = +product.free_shipping === 1 ? `<p class="small text-success vc-freeshipping"> Бесплатная доставка </p>` : ``;


    let button;
    if(+product.stock === 0) {
        button = `<button class="btn  btn-light btn-sm disabled"> Нет в наличии <i class="fa fa-shopping-cart"></i></button>`;
    } else {
        button = `<button class="btn btn-sm btn-light" onclick="quickProduct(${product.id})">Добавить в корзину <i class="fa fa-shopping-cart"></i></button>`;
    }

    let element = `<div class="col-md-3">
                        <figure class="card card-product-grid">
                            <div class="vertical-card-zoom">
                                <div class="img-wrap vertical-card-image">
                                    <img src="${image}" loading="lazy" class="image-zoom-preview-bl">
                                    <span class="topbar">
                                        ${free_shipping}
                                        ${label_1}
                                    </span>
                                </div>
                            </div>
                            <figcaption class="info-wrap border-top">
                                <a href="${url_redirect}" class="title" title="${product.name}">${product.name.trunc(25)}</a>
                                <div class="price-wrap mt-2">
                                    <span class="price h5"> ₴ ${product.price} </span>
                                    <del class="price-old"> ₴ ${product.price}</del>
                                </div> 
                                <div class="buttons-wrap mt-4">
                                    ${button}
                                    <button class="btn btn-sm btn-danger" onclick="removeFCProducts(${product.id})"><i class="fa fa-trash"></i></button>
                                </div>
                            </figcaption>
                        </figure>
                   </div>`;
    return element;
}
