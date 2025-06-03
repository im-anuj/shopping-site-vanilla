import { cart } from "../data/cart-class.js";
import { products, loadProductsFetch } from "../data/products.js"
import { renderHeader,updateCartQuantity } from "./shared/header.js";

renderHeader();

loadProductsFetch().then(() => {
    renderProductsGrid();
});

function renderProductsGrid() {
    let productsHTML = '';

    const url = new URLSearchParams(location.search);
    const search = url.get('search');

    let filteredProducts = products;
    if(search){
        filteredProducts = products.filter((product) => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
                if(keyword.toLowerCase().includes(search.toLowerCase())){
                    matchingKeyword = true;
                }
            });

            return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
        });
    }

    filteredProducts.forEach((product) => {
        productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
                Add to Cart
            </button>
        </div>
    `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    updateCartQuantity();

    const addedMessageTimeouts = {};

    function showAddedMessage(productId) {
        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');

        const previousTimeoutId = addedMessageTimeouts[productId];

        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);

        addedMessageTimeouts[productId] = timeoutId;
    }

    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {

            button.addEventListener('click', () => {
                const productId = button.dataset.productId; // or  const {productId} = button.dataset;


                const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
                const quantity = parseInt(quantitySelector.value);

                cart.addToCart(productId, quantity);
                updateCartQuantity();
                showAddedMessage(productId);
            });
        });
}