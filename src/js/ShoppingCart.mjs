import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {

  constructor(listElement, templateId) {
      this.listElement = listElement;
      this.templateElement = document.getElementById(templateId);
  }

  async displayCart() {
      const cartItems = getLocalStorage('so-cart') || [];

      if (cartItems.length === 0) {
          this.listElement.innerHTML = '<li>Your cart is empty</li>';
          return;
      }

      renderListWithTemplate(this.templateElement, this.listElement, cartItems);
  }
}