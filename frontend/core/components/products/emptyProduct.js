export default function emptyProduct (message) {

    let image = '//e-commerce.loc/public/assets/images/emptycart.png';

    let element = `<div class="card card-body">
                        <img src="${image}" class="empty-product-list image" loading="lazy">
                        <div class="empty-product-list title mb-5">${message}</div>
                    </div>`;
    return element;
}