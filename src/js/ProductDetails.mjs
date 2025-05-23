import { getLocalStorage, setLocalStorage } from "../js/utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
  }

  async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();     

    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));   
  }  

  addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || []; //Get items already in the cart, or add an empty array.
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
  }
    
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {

  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;
    
  const productImage = document.querySelector('.productImage')
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;
  document.querySelector('.productDescription').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('.productColor').textContent = product.Colors[1];
  document.querySelector('.productCardPrice').innerHTML = `$${product.FinalPrice.toFixed(2)}`;
  document.getElementById('addToCart').dataset.id = product.Id;
}

  



