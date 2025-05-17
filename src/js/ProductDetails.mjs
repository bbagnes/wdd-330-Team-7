import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product);  
    };

    renderProductDetails() {
        document.querySelector('.product-brand').textContent = this.product.Brand.Name;
        document.querySelector('.product-name').textContent = this.product.Name;
        document.querySelector('.product-image').src = this.product.Image;
        document.querySelector('.product-image').alt = this.product.Name;
        document.querySelector('.product-description').textContent = this.product.Description;
        document.querySelector('.product-color').textContent = this.product.Color;
        document.querySelector('.product-price').textContent = `$${this.product.FinalPrice.toFixed(2)}`;
        document.getElementById('addToCart').dataset.id = this.product.Id;
    }
}

