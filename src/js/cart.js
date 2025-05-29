import { getLocalStorage } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';
import { renderCartItem } from './ShoppingCart.mjs';

console.log('🛒 Cart contents:', getLocalStorage('so-cart'));

const cart = new ShoppingCart('cart-list', renderCartItem);
cart.displayCart();
