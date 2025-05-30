import ShoppingCart from './ShoppingCart.mjs';
import { renderCartItem } from './ShoppingCart.mjs';

const cart = new ShoppingCart('cart-list', renderCartItem);
cart.displayCart();
