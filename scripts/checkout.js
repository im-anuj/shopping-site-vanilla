import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
import { updateCartQuantity } from "./shared/header.js";

async function loadPage(){

    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);

    } catch(error){
        console.log('Unexpected error. Please try again later.');
    }
    

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

}

loadPage();

window.addEventListener('pageshow', (event) => {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    cart.loadFromStorage();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    updateCartQuantity();
  }
});