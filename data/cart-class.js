import { validDeliveryOption } from "./deliveryOptions.js";

class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;

        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if (!this.cartItems) {
            this.cartItems = [];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    loadFromStorage(){
        this.#loadFromStorage();
    }

    addToCart(productId, quantity) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) =>{
            return cartItem.productId !== productId;
        })

        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToStorage();
    }

    updateDeliveyOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (!matchingItem) {
            return;
        }

        if (!validDeliveryOption(deliveryOptionId)) {
            return;
        }

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

    resetCart() {
        this.cartItems = [];
        this.saveToStorage();
    }
}

export const cart = new Cart('cart-oop');