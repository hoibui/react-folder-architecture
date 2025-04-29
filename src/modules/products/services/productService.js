// Service to handle API calls for products
const PRODUCT_API_URL = "https://dummyjson.com/products";

export const productService = {
    async fetchProducts() {
        const response = await fetch(PRODUCT_API_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    },
};