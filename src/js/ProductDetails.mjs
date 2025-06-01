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

    console.log('Initializing ProductDetails...');

    const addToCartButton = document.getElementById('addToCart');
    console.log('Button found?', addToCartButton);

    addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];

    const productToSave = {
      ...this.product,
      quantity: 1,
      Image:
        this.product.Images?.PrimaryMedium ||
        this.product.Images?.PrimarySmall ||
        '',
    };

    console.log('Adding to cart:', productToSave); // <-- THIS should show quantity

    cartItems.push(productToSave);
    setLocalStorage('so-cart', cartItems);

    this.triggerCartButtonAnimation();
  }

  triggerCartButtonAnimation() {
    if (!this.cartButton) {
      this.cartButton = document.querySelector('.cart');
    }

    this.cartButton.classList.remove('cart-animation');
    void this.cartButton.offsetWidth;
    this.cartButton.classList.add('cart-animation');
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector('#p-brand').textContent = product.Brand.Name;
  document.querySelector('#p-name').textContent = product.NameWithoutBrand;

  // create a picture element using the responsive images from the API
  const picture = document.createElement('picture');
  picture.innerHTML = `
    <source media='(min-width: 1024px)' srcset='${product.Images.PrimaryExtraLarge}'>
    <source media='(min-width: 600px)' srcset='${product.Images.PrimaryMedium}'>
    <img id='p-image' src='${product.Images.PrimarySmall}' alt='${product.NameWithoutBrand}'>
  `;

  const imageContainer = document.querySelector('#image-container');
  imageContainer.innerHTML = ''; // Clear existing content
  imageContainer.appendChild(picture);

  const euroPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector('#p-price').textContent = `${euroPrice}`;
  document.querySelector('#p-color').textContent = product.Colors[0].ColorName;
  document.querySelector('#p-description').innerHTML =
    product.DescriptionHtmlSimple;

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
