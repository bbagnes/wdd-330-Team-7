import CheckoutProcess from './CheckoutProcess.mjs';

const checkout = new CheckoutProcess('so-cart', 'main.checkout');
checkout.init();

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const { valid, messages } = validateForm(this);
  let messageBox = document.querySelector('#checkout-message');

  if (!messageBox) {
    messageBox = document.createElement('p');
    messageBox.id = 'checkout-message';
    messageBox.style.marginTop = '1rem';
    messageBox.style.fontWeight = 'bold';
    this.appendChild(messageBox);
  }

  messageBox.textContent = '';

  if (!valid) {
    messageBox.textContent = messages.join(' ');
    messageBox.style.color = 'red';
    return;
  }

  checkout
    .checkout(this)
    .then(() => {
      messageBox.textContent = 'Order placed successfully!';
      messageBox.style.color = 'green';
      localStorage.removeItem('so-cart');

      // adding a link to home page
      const homeLink = document.createElement('a');
      homeLink.href = '/';
      homeLink.textContent = 'Return to Home';
      homeLink.classList.add('button');
      homeLink.style.display = 'inline-block';
      homeLink.style.marginTop = '1rem';
      messageBox.appendChild(document.createElement('br'));
      messageBox.appendChild(homeLink);
    })
    .catch((err) => {
      messageBox.textContent = `Checkout failed: ${err.message}`;
      messageBox.style.color = 'red';
    });
});

function validateForm(form) {
  const firstName = form.querySelector('#fname').value.trim();
  const lastName = form.querySelector('#lname').value.trim();
  const card = form.querySelector('#cardNumber').value.trim();

  let valid = true;
  let messages = [];

  if (!firstName || !lastName) {
    valid = false;
    messages.push('First and Last name are required.');
  }

  if (!/^\d{16}$/.test(card)) {
    valid = false;
    messages.push('Card number must be 16 digits.');
  }

  return { valid, messages };
}
