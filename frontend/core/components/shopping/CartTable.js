export default function CartTable(table) {
    let element = `<aside class="col-lg-9 mb-3">
                <table class="card card-body table table-borderless table-shopping-cart">
                    <thead class="text-muted">
                    <tr class="small text-uppercase e-cart-head-table">
                        <th scope="col" width="250">Товар</th>
                        <th scope="col" width="120">Количество</th>
                        <th scope="col" width="120">Цена</th>
                        <th scope="col" class="text-right" width="200"></th>
                    </tr>
                    </thead>
                    <tbody id="e-cart-products-table">
                    ${table}
                    </tbody>
                </table>

                <div class="card card-body border-top">
                    <p class="icontext"><i class="icon text-success fa fa-truck"></i> Бесплатная доставка в течении 1-2
                        недель</p>
                </div>
             </aside>`;
    return element;
}