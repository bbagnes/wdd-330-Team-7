import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0,
    );
    const subtotalElem = document.querySelector(
      `${this.outputSelector} #subtotal`,
    );
    if (subtotalElem) {
      subtotalElem.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = +(this.itemTotal * 0.06).toFixed(2);
    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = 10 + (itemCount - 1) * 2;
    this.orderTotal = +(this.itemTotal + this.tax + this.shipping).toFixed(2);
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElem = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElem = document.querySelector(
      `${this.outputSelector} #shippingEstimate`,
    );
    const totalElem = document.querySelector(
      `${this.outputSelector} #orderTotal`,
    );

    if (taxElem) taxElem.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingElem) shippingElem.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalElem) totalElem.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const order = Object.fromEntries(formData);
    order.orderDate = new Date().toISOString();
    order.items = this.packageItems();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    const services = new (await import('./ExternalServices.mjs')).default();

    try {
      await services.checkout(order);
      localStorage.removeItem(this.key); // <-- clear the cart on checkout
      window.location.href = '/checkout/thankyou.html';
    } catch (err) {
      console.error('Checkout failed: ', err);
    }
  }
}
