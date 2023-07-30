// Отримання іконки вішлісту
const wishlistIcon = document.querySelector('.like');

// Обробник кліку на іконку вішлісту
wishlistIcon.addEventListener('click', (event) => {
	event.preventDefault(); // Забороняємо перехід за посиланням

	// Отримання обраних товарів з локального сховища
	const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

	if (wishlistItems.length === 0) {
		// Якщо вішліст порожній, показати алерт "Your wishlist is empty."
		alert('Your wishlist is empty.');
	} else {
		// Якщо є обрані товари, перейти на сторінку wishlist.html
		window.location.href = "wishlist.html";
	}
});

export function renderWishlistItems(container) {
	// Отримати обрані товари з локального сховища
	const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

	// Очистити контейнер перед виведенням товарів
	container.innerHTML = '';

	// Вивести кожен обраний товар у контейнер
	wishlistItems.forEach((item) => {
		const card = document.createElement('div');
		card.classList.add('card-col');

		card.innerHTML = `
			<div class="card">
				<img class="card-img-top" src="${item.image}" alt="${item.title}">
				<div class="card-body">
					<h5 class="card-title">${item.title}</h5>
					<p class="card-text">${item.price}</p>
					<div class="product-actions">
						<a href="#" class="btn card-btn btn-add--js">Add to cart</a>
						<button class="btn btn-secondary btn-remove--js" data-title="${item.title}">Remove</button>
					</div>
				</div>
			</div>`;

		container.appendChild(card);
	});
}

// Видалення товару зі списку бажань
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('btn-remove--js')) {
		const titleToRemove = event.target.getAttribute('data-title');
		removeFromWishlist(titleToRemove);
	}
});

// Додавання товару в корзину
document.addEventListener('click', (event) => {
	if (event.target.classList.contains('btn-add--js')) {
		const titleToAdd = event.target.closest('.card-body').querySelector('.card-title').textContent;
		addToCart(titleToAdd);
		removeFromWishlist(titleToAdd);
	}
});

function addToCart(title) {
	// Отримати обрані товари з локального сховища
	const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

	// Знайти товар за назвою
	const itemToAdd = wishlistItems.find(item => item.title === title);
	if (itemToAdd) {
		// Отримати обрані товари з корзини або створити новий масив
		const cartItems = JSON.parse(localStorage.getItem('lastItems')) || [];

		// Додати товар до корзини
		cartItems.push(itemToAdd);

		// Зберегти оновлений масив корзини у локальне сховище
		localStorage.setItem('lastItems', JSON.stringify(cartItems));

		// Отримати поточне значення buyCount та збільшити його на 1
		const currentBuyCount = parseInt(localStorage.getItem('buyCount')) || 0;
		const updatedBuyCount = currentBuyCount + 1;

		// Оновити локальне сховище з оновленим значенням buyCount
		localStorage.setItem('buyCount', updatedBuyCount);

		// Оновити відображення лічильника buyCount на сторінці
		const buyCountElement = document.getElementById('buyCount');
		buyCountElement.textContent = updatedBuyCount;
	}
}

function removeFromWishlist(title) {
	// Отримати обрані товари з локального сховища
	let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

	// Видалити товар зі списку бажань за назвою
	wishlistItems = wishlistItems.filter(item => item.title !== title);

	// Зберегти оновлений масив у локальне сховище
	localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

	// Отримати поточне значення wishlistCount та зменшити його на 1
	const currentWishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;
	const updatedWishlistCount = Math.max(currentWishlistCount - 1, 0);

	// Оновити локальне сховище з оновленим значенням wishlistCount
	localStorage.setItem('wishlistCount', updatedWishlistCount);

	// Оновити відображення лічильника wishlistCount на сторінці
	const wishlistCountElement = document.getElementById('wishlistCount');
	wishlistCountElement.textContent = updatedWishlistCount;

	// Перевірити, чи потрібно перерендерити список бажань на сторінці wishlist.html
	if (window.location.href.includes("wishlist.html")) {
		renderWishlistItems(document.querySelector('.wishlist-container'));
	}

	// Перевірка на сторінці wishlist.html і перехід на main.html, якщо вішліст порожній
	if (window.location.href.includes("wishlist.html") && wishlistItems.length === 0) {
		// Якщо вішліст порожній, перейти на сторінку main.html
		window.location.href = "main.html";
	}
}