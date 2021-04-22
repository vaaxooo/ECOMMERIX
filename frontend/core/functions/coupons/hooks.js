import xhrRequest from "../xhrRequest.js";

window.checkCoupon = function checkCoupon() {
    const coupon_name = document.getElementById("e-shopping-cart-coupon").value;
    const empty_coupon_message = document.getElementById("empty-coupon-message");
    const e_checkout_amount = document.getElementById("e-checkout-amount");
    const e_checkout_discount = document.getElementById("e-checkout-discount");

    empty_coupon_message.innerHTML = "";

    xhrRequest("POST", "/coupons/checkCoupon", coupon_name)
        .then(response => {

            if(!response.ok) {
                empty_coupon_message.innerHTML = response.message;
                return false;
            }

            if(!response.coupon) {
                empty_coupon_message.innerHTML = response.message;
                return false;
            }

            empty_coupon_message.innerHTML = response.message;

            let amount = (+e_checkout_amount.innerHTML * response.coupon / 100).toFixed(2);
            let total_amount = (+e_checkout_amount.innerHTML - amount).toFixed(2);

                let blockElement = `<dt class="text-danger">Скидка:</dt>
                                <dd class="text-right text-danger" id="e-discount-amount">- ₴ ${amount}</dd>`;
            e_checkout_discount.innerHTML = e_checkout_discount.innerHTML + blockElement;
            e_checkout_amount.innerHTML = total_amount;
            return false;
        });

}


