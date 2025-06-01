import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
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
    this.list = await this.dataSource.getData(this.category);
    this.renderList();
    document.querySelector('.title').textContent = this.category;
  }

  renderList(sorting = 'name') {
    this.sortList(sorting);
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.list,
      'afterbegin',
      true,
    );
  }

  sortList(sorting = 'name') {
    if (sorting === 'name') {
      this.list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sorting === 'price') {
      this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
  }
}
