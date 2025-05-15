
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

        //Select the Produt List ul.
        const productList = document.querySelector('ul.productList');
        productList.innerHTML = ``;

        //Dynamically generate li for each product display
        const productCard = document.createElement('li');
        productItem.className = 'productCard';

        //Dynamically generate 'a' element for each product display
        const productItem = document.createElement('a');
        productLink.href = '#';

        //Dynamically generate img element for each product display and assign src and alt.
        const productImg = document.createElement('img');
        productImg.src = product.Image;
        productImg.alt = product.NameWithoutBrand;

        //Dynamically generate 'h3' element for each product display and assign content
        const cardBrand = document.createElement('h3');
        cardBrand.className = 'cardBrand';
        cardBrand.innerHTML = `${product.NameWithoutBrand}`;

        //Dynamically generate 'h2' element for each product display and assign content
        const cardName = document.createElement('h2');
        cardName.className = 'cardName';
        cardName.innerHTML = `${product.Brand.Name}`;

        //Dynamically generate 'p' element for each product display and assign content
        const productCardPrice = document.createElement('p');
        productCardPrice.className = 'productCardPrice';
   
        //Add img, h3, h2, and p elements as children of 'a' element.
        productItem.appendChild(productImg);
        productItem.appendChild(cardBrand);
        productItem.appendChild(cardName);
        productItem.appendChild(productCardPrice);

        //Add 'a' element as child of li element.
        productCard.appendChild(productItem);

        //Add 'li' element as child of ul/product list.
        productList.appendChild(productCard);        
    }
}