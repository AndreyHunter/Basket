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

export function updateBasketBtnColor(basket) {
    const addToCartBtns = document.querySelectorAll('.addToCart-btn');

    addToCartBtns.forEach(btn => {
        const card = btn.closest('.app__card');
        if (!card) return;
        const id = card.dataset.productid;
        const isInBasket = basket.includes(id);

        if (isInBasket) {
            btn.classList.add('active');
            btn.textContent = 'В корзине';
        } else {
            btn.classList.remove('active');
            btn.textContent = 'Добавить в корзину';
        }
    });
}               