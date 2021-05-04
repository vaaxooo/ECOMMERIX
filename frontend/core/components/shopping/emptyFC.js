export default function emptyFC(type = "wishlist") {
    let image = '//e-commerce.loc/public/assets/images/emptycart.png';

    let element = `<div class="card card-body empty">
                        <img src="${image}" class="empty-product-list image" alt="${EINIT.translate.products_list_empty}" loading="lazy">
                        <div class="empty-product-list title mb-5">
                            <span data-translate="empty_list_subtitle"></span>
                            <span data-translate="${type === "wishlist" ? type : 'carty'}"></span>!
                        </div>
                    </div>`;
    return element;
}