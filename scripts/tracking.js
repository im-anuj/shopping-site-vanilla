import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { calculateDeliveryDateFrom } from "../data/deliveryOptions.js";
import { findDeliveryOption } from "./orders.js";

async function loadPage(){
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let productDetails;
    order.products.forEach((details) => {
        if(details.productId === product.id){
            productDetails = details;
        }
    });

    let deliveryDate = 'undefined';
    const matchedOption = findDeliveryOption(order.orderTime, productDetails.estimatedDeliveryTime);
    if(matchedOption){
        const rawDate = calculateDeliveryDateFrom(order.orderTime, matchedOption);
        deliveryDate = rawDate.format('dddd, MMMM D');
    }

    const trackingHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;
    
    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();