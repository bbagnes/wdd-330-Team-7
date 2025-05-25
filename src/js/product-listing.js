import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter, toTitleCase } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const productData = new ProductData(category);
const productListElement = document.querySelector('.product-list');

const productList = new ProductList(category, productData, productListElement);

productList.init();

const title = document.querySelector('.products h2');
title.innerHTML = `Top Products: ${toTitleCase(category)}`;
