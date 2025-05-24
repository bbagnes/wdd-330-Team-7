import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const cartListElement = document.getElementById('cart-list');
const cart = new ShoppingCart(cartListElement, 'cart-template');
cart.displayCart();
