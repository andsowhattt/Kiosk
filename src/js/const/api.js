export const apiLinks = {
	api: 'https://api.escuelajs.co/api/v1/products',
	products: '?offset=0&limit=48',
	randomProducts: '?offset=0&limit=6',
	randomSale: '?offset=0&limit=6',
};
apiLinks.products = apiLinks.api + apiLinks.products;
apiLinks.randomProducts = apiLinks.api + apiLinks.randomProducts;
apiLinks.randomSale = apiLinks.api + apiLinks.randomSale;