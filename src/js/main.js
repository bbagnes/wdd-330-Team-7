import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const category = 'tents';
const productData = new ProductData(category);
const productListElement = document.querySelector('.product-list');

const productList = new ProductList(
  category,
  productData,
  productListElement,
).init();

loadHeaderFooter();
