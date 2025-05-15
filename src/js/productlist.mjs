
export default class ProductList {
    constructor(category, dataSource, listElement, ) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
  }

    async init() {
        const list = await this.dataSource.getData();
    }

    productCardTemplate(product) {

        return `<li class="productCard">
    <a href="product_pages/?product=">
      <img src="" alt="Image of ">
      <h2 class="cardBrand"></h2>
      <h3 class="cardName"></h3>
      <p class="productCardPrice">$</p>
    </a>
  </li>`      
    }
}