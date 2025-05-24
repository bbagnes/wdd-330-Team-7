import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productId = getParam('product');
// console.log('Loaded productId from URL:', productId);
const dataSource = new ProductData();

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

loadHeaderFooter();
