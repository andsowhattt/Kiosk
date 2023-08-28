export const apiLinks = {
	api: 'https://fakestoreapi.com/products',
	products: '?limit=20',
	randomProducts: '?limit=6',
	randomSale: '?limit=6',
};
apiLinks.products = apiLinks.api + apiLinks.products;
apiLinks.randomProducts = apiLinks.api + apiLinks.randomProducts;
apiLinks.randomSale = apiLinks.api + apiLinks.randomSale;