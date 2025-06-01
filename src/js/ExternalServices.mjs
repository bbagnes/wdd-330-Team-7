const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log('Fetched full product data:', data.Result);
    return data.Result;
  }

  async checkout(order) {
    const response = await fetch(`${baseURL}checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const body = await response.text(); // Read the body whether ok or not

    if (!response.ok) {
      console.error('❌ Server response body:', body); // show real error
      throw new Error(`Checkout failed: ${body}`);
    }

    return JSON.parse(body);
  }
}
