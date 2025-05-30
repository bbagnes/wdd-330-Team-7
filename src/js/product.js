import { getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';
import { loadHeaderFooter } from './utils.mjs';

const productId = getParam('product');

const dataSource = new ExternalServices();

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

loadHeaderFooter();
