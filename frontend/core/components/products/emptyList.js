export default function emptyList () {

    let image = '//e-commerce.loc/public/assets/images/emptycart.png';

    let element = `<div class="card card-body">
                        <img src="${image}" class="empty-product-list image" loading="lazy">
                        <div class="empty-product-list title" data-translate="products_list_empty"></div>
                        <div class="empty-product-list subtitle mb-5" data-translate="products_list_empty_subtitle"></div>
                    </div>`;
    return element;
}