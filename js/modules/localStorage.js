export function setCardToLocalStorage(basket) {
	localStorage.setItem('basket', JSON.stringify(basket));
	const basketLenghtText = document.querySelector('.basket-open span');
	basketLenghtText.textContent = basket.length;
}

export function getBasketFromLocalStorage() {
	const basketItems = localStorage.getItem('basket');
	return basketItems ? JSON.parse(basketItems) : [];
}

export function renderBasketLength() {
	const basketLenghtText = document.querySelector('.basket-open span');
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

export async function getBasketIds(basket, url) {
    const basketIds = basket.map(item => parseInt(item));

    try {
        const res = await fetch(url);

        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        return data.filter(item => basketIds.includes(item.id));

    } catch (err) {
        console.error('Feiled on fetch', err);
    }
}