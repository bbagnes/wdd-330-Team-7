import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement, ) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
  }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}

function productCardTemplate(product) {

      return `<li class="product-card">
        <a href="product_pages/?product=">
        <img src="" alt="Image of ">
        <h2 class="card__brand"></h2>
        <h3 class="card__name"></h3>
        <p class="product-card__price">$</p>
        </a>
      </li>`      
}

    
