import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam} from './utils.mjs';

const category = getParam('category');
const productData = new ProductData();
const productListElement = document.querySelector('.product-list');

const productList = new ProductList(category, productData, productListElement);

productList.init();
loadHeaderFooter();
