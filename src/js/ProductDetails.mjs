import { getLocalStorage, setLocalStorage } from './utils.mjs';

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
  
  const productImage = document.querySelector('.productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  const euroPrice = new Intl.NumberFormat('de-DE',
    {
      style: 'currency', currency: 'EUR',
    }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#p-price").textContent = `${euroPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

  product.SuggestedRetailPrice = product.FinalPrice + 50;

  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discount = product.SuggestedRetailPrice - product.FinalPrice;

    const discountPercentage = Math.round(
      (discount / product.SuggestedRetailPrice) * 100,
    );
    document.querySelector('#p-discount').textContent =
      `You save ${discountPercentage}%!`;
  } else {
    document.querySelector('#p-discount').textContent = '';
  }

  const addToCartBtn = document.querySelector('#addToCart');
  if (addToCartBtn) {
    addToCartBtn.dataset.id = product.Id;
  }
}