// Отримуємо елементи з id "buyCount" і "wishlistCount" з хедеру
const buyCountElement = document.getElementById('buyCount');
const wishlistCountElement = document.getElementById('wishlistCount');

// Отримуємо збережені значення з localStorage або встановлюємо значення за замовчуванням
let buyCount = localStorage.getItem('buyCount') || 0;
let wishlistCount = localStorage.getItem('wishlistCount') || 0;

// Функція для оновлення цифри в хедері та збереження значення в localStorage
function updateCount(element, count, key) {
  element.textContent = count > 0 ? count : '';
  localStorage.setItem(key, count);
}

// Оновлюємо значення цифр при завантаженні сторінки
updateCount(buyCountElement, buyCount, 'buyCount');
updateCount(wishlistCountElement, wishlistCount, 'wishlistCount');

// Обробник події для кнопки "Buy"
document.addEventListener('click', function(event) {
  if (event.target.matches('.product-buy-actions .my-btn')) {
    buyCount++; // Збільшуємо лічильник
    updateCount(buyCountElement, buyCount, 'buyCount'); // Оновлюємо цифру в хедері та зберігаємо значення в localStorage
  }
});

// Обробник події для кнопки "Wishlist this"
document.addEventListener('click', function(event) {
  if (event.target.matches('.product-buy-actions .btn-secondary')) {
    wishlistCount++; // Збільшуємо лічильник
    updateCount(wishlistCountElement, wishlistCount, 'wishlistCount'); // Оновлюємо цифру в хедері та зберігаємо значення в localStorage
  }
});
