import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const listElement = document.querySelector('.product-list');
const dataSource = new ProductData('tents');
const tentList = new ProductList('tents', dataSource, listElement);

tentList.init();

