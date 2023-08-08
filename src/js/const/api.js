export const apiLinks = {
	products: 'https://api.escuelajs.co/api/v1/products',
	randomProducts: '?offset=0&limit=3',
	randomSale: '?offset=0&limit=6',
};

apiLinks.randomProducts = apiLinks.products + apiLinks.randomProducts;
apiLinks.randomSale = apiLinks.products + apiLinks.randomSale;