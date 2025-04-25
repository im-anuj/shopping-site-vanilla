import { cart } from "../../data/cart-class.js";

export function renderCheckoutHeader(){
    let cartQuantity = 0;

    cart.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    function cartQuantityText(cartQuantity){
        let text;
        if(cartQuantity === 0){
            text = cartQuantity;
        } else if(cartQuantity === 1){
            text = `${cartQuantity} item`;
        } else{
            text = `${cartQuantity} items`;
        }

        return text;
    }

    const checkoutHeaderHTML = `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="amazon.html">
                <img class="amazon-logo" src="images/amazon-logo.png">
                <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                </a>
            </div>

            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link js-return-to-home-link"
                    href="amazon.html">${cartQuantityText(cartQuantity)}</a>)
            </div>

            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    `;

    document.querySelector('.js-checkout-header')
    .innerHTML = checkoutHeaderHTML;
}