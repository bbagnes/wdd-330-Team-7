import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    // message if the item is not found
    if (!this.product) {
      console.error('Product not found for ID:', this.productId);
      document.querySelector('.product-details')?.insertAdjacentHTML(
        'beforeend',
        `<p class="error-message">Sorry, we couldn't find this product.</p>`
      );
      return;
    }

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    document.querySelector('.product-brand').textContent = this.product.Brand?.Name || this.product.Brand;
    document.querySelector('.product-name').textContent = this.product.Name;
    document.querySelector('.product-image').src = this.product.Image.replace('../', '/');
    document.querySelector('.product-image').alt = this.product.Name;
    document.querySelector('.product-description').textContent = this.product.DescriptionHtmlSimple || this.product.Description;
    document.querySelector('.product-color').textContent = this.product.Colors?.[0]?.ColorName || this.product.Color;
    document.querySelector('.product-price').textContent = `$${this.product.FinalPrice.toFixed(2)}`;    
  }
}
