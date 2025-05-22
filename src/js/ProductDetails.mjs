import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
        let cartItems = getLocalStorage('so-cart') || [];

        if (!Array.isArray(cartItems)) {
            cartItems = [cartItems];
        }

        console.table(this.product);
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
  document.querySelector('.productColor').textContent = product.Colors[0].ColorName;
  document.querySelector('.productCardPrice').innerHTML = `$${product.FinalPrice.toFixed(2)}`;
  document.getElementById('addToCart').dataset.id = product.Id;
}

  



