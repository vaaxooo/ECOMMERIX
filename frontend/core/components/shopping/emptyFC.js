export default function emptyFC(type = "favorites") {
    type = type === "favorites" ? "Избранное" : "Корзину";
    let image = '//e-commerce.loc/public/assets/images/emptycart.png';

    let element = `<div class="card card-body empty">
                        <img src="${image}" class="empty-product-list image" alt="Products list empty" loading="lazy">
                        <div class="empty-product-list title mb-5">Вы еще не добавляли товары в ${type}!</div>
                    </div>`;
    return element;
}