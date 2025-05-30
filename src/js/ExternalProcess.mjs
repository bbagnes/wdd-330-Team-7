export default class ExternalServices {
    constructor() {
        this.checkoutUrl = 'https://wdd330-backend.onrender.com/checkout';
    }

    async checkout(order) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        };
        const response = await fetch(this.checkoutUrl, options);
        if (!response.ok) throw new Error('Checkout failed');
        return await response.json();
    }
}
