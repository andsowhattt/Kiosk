export const apiLinks = {
	products: 'https://api.escuelajs.co/api/v1/products?categoryId=1',
	randomProducts: 'https://api.escuelajs.co/api/v1/products?offset=0&limit=3',
	randomSale: 'https://api.escuelajs.co/api/v1/products?offset=0&limit=6',
};

const loadingOverlayClass = 'loading-overlay';

function createLoadingOverlay(container) {
	const loadingOverlay = document.createElement('div');
	loadingOverlay.classList.add(loadingOverlayClass);
	container.appendChild(loadingOverlay);
	return loadingOverlay;
}

function removeLoadingOverlay(loadingOverlay) {
	if (loadingOverlay) {
		loadingOverlay.remove();
	}
}

export async function fetchProducts(link, containerClass) {
	try {
		const container = document.querySelector(containerClass);
		const loadingOverlay = createLoadingOverlay(container);

		const result = await fetch(link);
		const data = await result.json();

		removeLoadingOverlay(loadingOverlay);

		renderProducts(data, containerClass);
	} catch (error) {
		console.log('Error fetching data:', error);
	}
}

export function renderProducts(products, containerClass) {
	const container = document.querySelector(containerClass);

	products.forEach(({ images, title, price }) => {
		const card = document.createElement('div');
		card.classList.add('card-col');

		card.innerHTML = `
		<div class="card">
			<img class="card-img-top" src="${images}" alt="${title}">
			<div class="card-body">
				<h5 class="card-title">${title}</h5>
				<p class="card-text">$${price}</p>
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

export function hideLoadingOverlay() {
	const loadingOverlay = document.querySelector(`.${loadingOverlayClass}`);
	removeLoadingOverlay(loadingOverlay);
}
