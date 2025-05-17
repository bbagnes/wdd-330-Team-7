import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    const imagePath = product.Image.replace('../', '/');

  return `
  <li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}" class="card_link">
      <h2 class="card_brand">${product.Brand?.Name || ''}</h2>
      <h3 class="card_name">${product.Name}</h3>
      <img class="card_image" src="${imagePath}" alt="${product.Name}">
      <p class="product-price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>
`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }

  renderList(productArray) {
    renderListWithTemplate(productCardTemplate, this.listElement, productArray, 'afterbegin', true);
  }
}
// removed the add product to cart as it is now being handled within productDetails.mjs
// removed the add to cart button event handler async function as it is also now being handled within productDetails.mjs
// removed the add listener to Add to Cart button eventListener as it is now being handled within productDetails.mjs