const wishlistIcon = document.querySelector('.like--js');

wishlistIcon.addEventListener('click', (event) => {
	event.preventDefault(); 

	const wishlistItems = getWishlistItems();

	if (wishlistItems.length === 0) {
		alert('Your wishlist is empty.');
	} else {
		window.location.href = "wishlist.html";
	}
});

export function renderWishlistItems(container) {
	const wishlistItems = getWishlistItems();

	container.innerHTML = '';

	wishlistItems.forEach((item) => {
		const card = createCardElement(item);
		container.appendChild(card);
	});
}

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('btn-remove--js')) {
		const titleToRemove = event.target.getAttribute('data-title');
		removeFromWishlist(titleToRemove);
	}
});

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('btn-add--js')) {
		const titleToAdd = event.target.closest('.card__block').querySelector('.card__block-title').textContent;
		addToCart(titleToAdd);
		removeFromWishlist(titleToAdd);
	}
});

function getWishlistItems() {
	return JSON.parse(localStorage.getItem('wishlistItems')) || [];
}

function createCardElement(item) {
	const card = document.createElement('div');
	card.classList.add('card-col');

	card.innerHTML = `
	<div class="card">
      <img class="card__img card-img-top" src="${item.image}" alt="${item.title}">
      <div class="card__block card-body">
			<h5 class="card__block-title card-title">${item.title}</h5>
			<p class="card__block-price card-text">${item.price}</p>
			<div class="card__block-actions actions">
				<a href="#" class="actions__add btn card-btn btn-add--js">Add to cart</a>
				<button class="actions__remove btn btn-secondary btn-remove--js" data-title="${item.title}">Remove</button>
			</div>
		</div>
	</div>`;

	return card;
}

function addToCart(title) {
	const wishlistItems = getWishlistItems();
	const itemToAdd = wishlistItems.find(item => item.title === title);

	if (itemToAdd) {
		const cartItems = JSON.parse(localStorage.getItem('lastItems')) || [];
		cartItems.push(itemToAdd);
		localStorage.setItem('lastItems', JSON.stringify(cartItems));

		const currentBuyCount = parseInt(localStorage.getItem('buyCount')) || 0;
		const updatedBuyCount = currentBuyCount + 1;
		localStorage.setItem('buyCount', updatedBuyCount);

		const buyCountElement = document.querySelector('.buy-count--js');
		buyCountElement.textContent = updatedBuyCount;
	}
}

function removeFromWishlist(title) {
	let wishlistItems = getWishlistItems();
	wishlistItems = wishlistItems.filter(item => item.title !== title);
	localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

	const currentWishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;
	const updatedWishlistCount = Math.max(currentWishlistCount - 1, 0);
	localStorage.setItem('wishlistCount', updatedWishlistCount);

	const wishlistCountElement = document.querySelector('.wishlist-count--js');
	wishlistCountElement.textContent = updatedWishlistCount;

	if (window.location.href.includes("wishlist.html")) {
		renderWishlistItems(document.querySelector('.wishlist__block'));
	}

	if (window.location.href.includes("wishlist.html") && wishlistItems.length === 0) {
		window.location.href = "main.html";
	}
}