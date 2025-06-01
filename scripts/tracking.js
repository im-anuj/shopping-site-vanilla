import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { calculateDeliveryDateFrom } from "../data/deliveryOptions.js";
import { findDeliveryOption } from "./orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderHeader, updateCartQuantity } from "./shared/header.js";

renderHeader();
updateCartQuantity();

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

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveyTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveyTime - orderTime)) * 100;

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
          <div class="progress-label ${
            percentProgress < 50 ? 'current stauts' : ''
          }">
            Preparing
          </div>
          <div class="progress-label ${
            percentProgress >= 50 && percentProgress < 100 ? 'current stauts' : ''
          }">
            Shipped
          </div>
          <div class="progress-label ${
            percentProgress >= 100 ? 'current stauts' : ''
          }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
    `;
    
    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();