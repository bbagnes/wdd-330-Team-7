import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

// Initialize the checkout process
const checkout = new CheckoutProcess('so-cart', 'main.checkout');
checkout.init();

// Handle form submission
document.querySelector('form').addEventListener('submit', function (ev) {
  ev.preventDefault();

  const form = ev.target;
  form.reportValidity();

  if (form.checkValidity()) {
    checkout.checkout(this);
  }
});

// Load header and footer into the page
loadHeaderFooter();

// Add autoformat to inputs
function formatToDigitsOnly(elementEvent) {
  const input = elementEvent.target;
  input.value = input.value.replace(/[^0-9/]/g, '');
}

document.querySelector('#zipcode').addEventListener('input', formatToDigitsOnly);
document.querySelector('#cardNumber').addEventListener('input', formatToDigitsOnly);
document.querySelector('#cardExpiration').addEventListener('input', formatToDigitsOnly);
document.querySelector('#cardCode').addEventListener('input', formatToDigitsOnly);
