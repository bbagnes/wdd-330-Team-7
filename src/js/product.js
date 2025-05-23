import ProductData from '../js/ProductData.mjs';
import ProductDetails from '../js/ProductDetails.mjs';
import { loadHeaderFooter, getParam } from '../js/utils.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

/* add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
*/

loadHeaderFooter();
