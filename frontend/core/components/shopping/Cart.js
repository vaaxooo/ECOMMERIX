export default function Cart (product) {
    let image = product.image ? product.image : '//e-commerce.loc/public/assets/images/no-image.png';
    let url_redirect = "/product/" + product.name.replace(/ /g, "-").toLocaleLowerCase() + "-" + product.id.replace(/ /g, "");

    let label_1 = product.label_1 ? `<span class="badge badge-success"> ${product.label_1} </span>` : ``;
    let free_shipping = +product.free_shipping === 1 ? `<small class="text-success"> Бесплатная доставка </small>` : ``;


    let favorite_product = !checkFavoriteProduct(product.id)

        ? `<button class="btn btn-light" title="Добавить в избранное" onclick="favoriteProduct(${product.id}, 'cart')"><i class="fas fa-heart"></i></button>`
        : `<button class="btn btn-outline-danger" title="Удалить из избранного" onclick="favoriteProduct(${product.id}, 'cart')"><i class="fas fa-heart"></i></button>`;

    let attributes = ``;
    if(product.selectedAttributes) {
        for(let attribute of product.selectedAttributes) {
            attributes += `<span class="text-muted small"><b>${attribute.name}:</b> ${attribute.option}</span> `;
        }
    }

    let element = `<tr>
                        <td>
                            <figure class="itemside align-items-center">
                                <div class="aside">
                                    <img 
                                        src="${image}"
                                        class="img-sm e-cart-image-preview" />
                                </div>
                                <figcaption class="info">
                                    <a href="${url_redirect}" class="title text-dark" title="${product.name}">${product.name.trunc(25)}</a>
                                    ${attributes}
                                </figcaption>
                            </figure>
                        </td>
                        <td>
                            <div class="input-group input-spinner">
                                <div class="input-group-prepend">
                                    <button class="btn btn-light ${ +product.count === 1 ? 'disabled' : '' }" type="button" id="button-minus" onclick="changeProductCount('${product.cart_id}', 'decrement')"><i
                                                class="fa fa-minus"></i></button>
                                </div>
                                <input type="text" class="form-control bg-light" value="${product.count}" disabled>
                                <div class="input-group-append">
                                    <button class="btn btn-light ${ +product.count === +product.stock ? 'disabled' : '' }" type="button" id="button-plus" onclick="changeProductCount('${product.cart_id}', 'increment')"><i
                                                class="fa fa-plus"></i></button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="price-wrap">
                                <span class="price h5"> ₴ <span id="e-shopping-cart-product-price">${product.price * product.count}</span> </span>
                            </div>
                        </td>
                        <td class="text-right">
                            ${favorite_product}
                            <button class="btn btn-light btn-round" onclick="removeFCProducts('${product.cart_id}', 'cart')"> Удалить </button>
                        </td>
                    </tr>`;
    return element;
}