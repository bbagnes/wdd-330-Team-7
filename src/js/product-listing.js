import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const productData = new ProductData(category);
const productListElement = document.querySelector('.product-list');

const productList = new ProductList(
  category,
  productData,
  productListElement,
);

productList.init();