export const productsLink = 'https://api.escuelajs.co/api/v1/products?categoryId=1';
export const randomProductsLink = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=3';
export const randomSaleLink = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=6';

export async function fetchProducts(link, containerClass) {
	try {
		const result = await fetch(link);
		const data = await result.json();
		renderProducts(data, containerClass);
	} catch (error) {
		console.log('Error fetching data:', error);
	}
}

export function renderProducts(products, containerClass) {
	const container = document.querySelector(containerClass);

	products.forEach((product) => {
		const card = document.createElement('div');
		card.classList.add('card-col');

		card.innerHTML = `
      <div class="card">
			<img class="card-img-top" src="${product.images}" alt="${product.title}">
			<div class="card-body">
				<h5 class="card-title">${product.title}</h5>
				<p class="card-text">$${product.price}</p>
				<div class="product-actions">
				<div class="product-buy-actions">
					<a href="#" class="btn card-btn btn-buy--js"><i class="fas fa-shopping-cart enlarged-icon"></i>Buy</a>
					<a href="#" class="btn btn-secondary btn-wish--js"><i class="fas fa-heart enlarged-icon"></i>Wishlist this</a>
            </div>
            <div class="products-details">
					<a href="shop-cart.html" class="btn btn-dark">View Details</a>
            </div>
         </div>
      </div>
      </div>`;
		container.appendChild(card);
	});
}