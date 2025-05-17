import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

function addProductToCart(product) {
  const cartItems = getLocalStorage('so-cart') || []; //Get items already in the cart, or add an empty array.
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
