import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const productListElement = document.querySelector('.product-list');

const productData = new ProductData();
const productList = new ProductList(
  'category',
  productData,
  productListElement,
);
