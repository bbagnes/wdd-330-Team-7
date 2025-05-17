import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import Alert from './Alert.js';

const listElement = document.querySelector('.product-list');
const dataSource = new ProductData('tents');
const tentList = new ProductList('tents', dataSource, listElement);
const alertSystem = new Alert('/json/alerts.json');

tentList.init();
alertSystem.init();
