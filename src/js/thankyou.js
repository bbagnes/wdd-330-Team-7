import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

document.addEventListener('DOMContentLoaded', () => {
  const message = localStorage.getItem('checkoutStatus');
  if (message === 'success') {
    const p = document.createElement('p');
    p.textContent = 'Thanks again for shopping with us!';
    document.querySelector('.confirmation').appendChild(p);
    localStorage.removeItem('checkoutStatus');
  }
});
