console.log('✅ product.js is running');

import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productId = getParam('product');

const dataSource = new ProductData();

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

loadHeaderFooter();
