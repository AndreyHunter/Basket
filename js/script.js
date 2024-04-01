import {
	getBasketFromLocalStorage,
	setCardToLocalStorage,
	renderBasketLength,
    updateBasketBtnColor
} from './modules/localStorage.js';

import { renderCards } from './modules/render.js';
import { getData } from './modules/requests.js';
import { 
    CARDS_VIEV_COUNT,
    CATALOG
} from './modules/constans.js';

getData('https://fakestoreapi.com/products')
	.then((res) => renderCards(res, CATALOG))
	.then(() => renderBasketLength())
    .then(() => updateBasketBtnColor(getBasketFromLocalStorage()))
	.catch((err) => console.error('Something went wrong', err));

const productList = document.querySelector(CATALOG);
productList.addEventListener('click', addToBasket);

function addToBasket(e) {
	const targetBtn = e.target.closest('.addToCart-btn');
	if (!targetBtn) return;
	const card = targetBtn.closest('.app__card');
	if (!card) return;
	const id = card.dataset.productid;

	let basket = getBasketFromLocalStorage();

	if (!Array.isArray(basket)) {
		basket = [];
	}

	if (basket.includes(id)) {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	} else {
		basket.push(id);
	}

	setCardToLocalStorage(basket);
    updateBasketBtnColor(basket);
}