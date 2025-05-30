import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

// Initialize the checkout process
const checkout = new CheckoutProcess('so-cart', 'main.checkout');
checkout.init();

// Handle form submission
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    checkout.checkout(this);
});

// Load header and footer into the page
loadHeaderFooter();
