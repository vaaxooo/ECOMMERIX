export default function CartCheckout(amount) {
    let element = `<aside class="col-lg-3">
            <div class="card mb-3">
                <div class="card-body">
                    <div class="form-group">
                        <label>Имеете купон?</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="" placeholder="Название" id="e-shopping-cart-coupon">
                            <span class="input-group-append">
                            <button class="btn btn-primary" onclick="checkCoupon()"><i class="fas fa-check"></i></button>
                        </span>
                        </div>
                        <span class="mt-2 text-danger d-block" id="empty-coupon-message"></span>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <dl class="dlist-align">
                        <dt>Общая сумма:</dt>
                        <dd class="text-right">₴ ${ amount }</dd>
                    </dl>
                    <dl class="dlist-align" id="e-checkout-discount"></dl>
                    <dl class="dlist-align">
                        <dt>К оплате:</dt>
                        <dd class="text-right text-dark b">₴ <strong id="e-checkout-amount"> ${ amount }</strong></dd>
                    </dl>
                    <hr>
                    <p class="text-center mb-3">
                        <img src="//e-commerce.loc/public/assets/images/icons/payments.png" height="26">
                    </p>
                    <a href="#" class="btn btn-primary btn-block"> Совершить покупку </a>
                </div>
            </div>

        </aside>`;
    return element;
}