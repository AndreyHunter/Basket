export function setCardToLocalStorage(basket) {
	localStorage.setItem('basket', JSON.stringify(basket));
	const basketLenghtText = document.querySelector('.basket span');
	basketLenghtText.textContent = basket.length;
}

export function getBasketFromLocalStorage() {
	const basketItems = localStorage.getItem('basket');
	return basketItems ? JSON.parse(basketItems) : [];
}

export function renderBasketLength() {
	const basketLenghtText = document.querySelector('.basket span');
	const basket = getBasketFromLocalStorage();
	basketLenghtText.textContent = basket.length;
}
