export default function QuickProductComponent(product) {

    let image = product.image ? product.image : '//e-commerce.loc/public/assets/images/no-image.png';
    let label_1 = product.label_1 ? `<span class="badge badge-success px-2 mt-5 ml-5"> ${product.label_1} </span>` : ``;

    let free_shipping = +product.free_shipping === 1 ? `<p class="small text-success" data-translate="free_shipping"> </p>` : ``;
    let wishlist_product = !checkWishlistProduct(product.id)

        ? `<button class="btn btn-light" title="${EINIT.translate.add_to_wishlist}" onclick="wishlistProduct(${product.id}, 'productInfo')"><i class="fas fa-heart"></i></button>`
        : `<button class="btn btn-outline-danger" title="${EINIT.translate.remove_from_wishlist}" onclick="wishlistProduct(${product.id}, 'productInfo')"><i class="fas fa-heart"></i></button>`;

    let gallery = ``;
    if (product.gallery) {
        let images = product.gallery.split(";");
        images.pop();
        for (let i in images) {
            let img = images[i] ? images[i] : `//e-commerce.loc/public/images/no-image.png`;
            gallery += `<span class="item-thumb gbox" onclick="changePreviewImage('${img}')"> 
                            <img src="${img}" alt="${product.name}" loading="lazy" class="e-product-gallery-images" />
                        </span>`;
        }
    }


    let button = +product.stock === 0
        ? `<a href="#" class="btn  btn-primary disabled" data-translate="not_available"></a>`
        : `<a href="#" class="btn btn-primary" data-translate="buy_now"> <i class="fa fa-shopping-cart"></i></a>`;

    let button_2 = `<button class="btn btn-light" title="${EINIT.translate.add_to_cart}" onclick="cartProduct(${product.id}, 'productInfo')"><i class="fa fa-plus"></i></button>`;

    /*
    * PRODUCT ATTRIBUTES
    * */
    let attributes = ``;
    if(product.attributes) {

        if(typeof product.attributes === "string") {
            product.attributes = JSON.parse(product.attributes);
        }

        for(let attribute of product.attributes) {
            let attribute_name = attribute.name;
            let attribute_options = attribute.options;
            let options = ``;
            for(let option of attribute_options) {
                options += `<label class="btn btn-light" data-attribute-name="${attribute_name}" data-attribute-option="${option}" onclick="selectProductAttribute(${product.id})">
                                <input type="radio" name="radio_size"> ${option}
                            </label>`;
            }
            attributes += `<div class="col-md-6">
                                <div class="item-option-select">
                                    <h6>${attribute_name}</h6>
                                    <div class="btn-group btn-group-sm btn-group-toggle" data-toggle="buttons">
                                        ${options}
                                    </div>
                                </div>
                            </div>`;

        }
    }

    /* END */

    /*
    * BEGIN BLOCK
    * */

    let element = `<div class="col-12">
            <div class="row no-gutters">
                <aside class="col-md-5 m-auto">
                    <article class="gallery-wrap">
                        <div class="img-big-wrap e-product-zoom mb-4">
                            ${label_1}
                            <a href="${image}" class="e-product-preview" id="e-product-image-gbox" data-fancybox="light-masonry">
                                <img src="${image}" loading="lazy" class="e-product-image-preview" id="e-product-image-preview">
                            </a>
                        </div> <!-- img-big-wrap.// -->
                        <div class="thumbs-wrap">
                            ${gallery}
                        </div> <!-- thumbs-wrap.// -->
                    </article> <!-- gallery-wrap .end// -->
                </aside>
                <main class="col-md-7 border-left">
                    <article class="content-body">

                        <h2 class="title" title="${product.name}">${product.name.trunc(50)}</h2>

                        <div class="rating-wrap my-3">
                            <ul class="rating-stars">
                                <li style="width:60%" class="stars-active">
                                    <img src="//e-commerce.loc/public/assets/images/icons/stars-active.svg" alt="">
                                </li>
                                <li>
                                    <img src="//e-commerce.loc/public/assets/images/icons/starts-disable.svg" alt="">
                                </li>
                            </ul>
                            <small class="label-rating text-muted">0 <span data-translate="reviews"></span></small>
                            <small class="label-rating text-success"> <i class="fa fa-clipboard-check"></i> 0 <span data-translate="orders"></span> </small>
                        </div> <!-- rating-wrap.// -->

                        <div class="mb-3 pc-right">
                            <var class="price h4">₴ ${product.price}</var>
                            <span class="text-muted">/${EINIT.translate.piece}</span>
                            ${free_shipping}
                        </div>
                        
                        <hr>

                        <p title="${product.short_description}">${product.short_description}</p>

                        <div class="row">  
                            ${attributes}
                        </div>
                        <div class="row mt-3 align-items-center">
                            <div class="col-md-4">
                                ${wishlist_product}
                                <a href="#" class="btn  btn-light"> <i class="fa fa-folder-plus"></i>  </a>
                            </div>
                            <div class="col-md-8 text-right">
                                ${button}
                                ${button_2 ? button_2 : ""}
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </div>`;
    return element;
}

