import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');
const product = new ProductDetails(productId, dataSource);
product.init();

// remove the add product to cart as it is now being handled within productDetails.mjs
// removed the add to cart button event handler async function as it is also now being handled within productDetails.mjs


// removed the add listener to Add to Cart button eventListener as it is now being handled within productDetails.mjs

