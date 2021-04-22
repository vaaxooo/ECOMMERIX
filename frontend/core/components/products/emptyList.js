export default function emptyList () {

    let image = '//e-commerce.loc/public/assets/images/emptycart.png';

    let element = `<div class="card card-body">
                        <img src="${image}" class="empty-product-list image" alt="Products list empty" loading="lazy">
                        <div class="empty-product-list title">Список товаров пуст..</div>
                        <div class="empty-product-list subtitle mb-5">Попробуйте отредактировать фильтр, это может помочь!</div>
                    </div>`;
    return element;
}