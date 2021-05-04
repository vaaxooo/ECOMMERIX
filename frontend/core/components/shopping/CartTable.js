export default function CartTable(table) {
    let element = `<aside class="col-lg-9 mb-3">
                <table class="card card-body table table-borderless table-shopping-cart">
                    <thead class="text-muted">
                    <tr class="small text-uppercase e-cart-head-table">
                        <th scope="col" width="250" data-translate="product"></th>
                        <th scope="col" width="120" data-translate="quantity"></th>
                        <th scope="col" width="120" data-translate="price"></th>
                        <th scope="col" class="text-right" width="200"></th>
                    </tr>
                    </thead>
                    <tbody id="e-cart-products-table">
                    ${table}
                    </tbody>
                </table>

                <div class="card card-body border-top">
                    <p class="icontext"><i class="icon text-success fa fa-truck"></i>  <span data-translate="shipping_notification"></span></p>
                </div>
             </aside>`;
    return element;
}