import ProductData from '../js/ProductData.mjs';
import ProductList from '../js/ProductList.mjs';
import { loadHeaderFooter, getParam} from '../js/utils.mjs';

const category = getParam('category');
const productData = new ProductData();
const productListElement = document.querySelector('.product-list');

const productList = new ProductList(category, productData, productListElement);

productList.init();
loadHeaderFooter();
