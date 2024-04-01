import {
	getBasketFromLocalStorage,
	setCardToLocalStorage,
	renderBasketLength,
    updateBasketBtnColor,
    getBasketIds
} from './modules/localStorage.js';

import { 
    renderCards,
    renderBasketCards
 } from './modules/render.js';
import { getData } from './modules/requests.js';
import { 
    CARDS_VIEV_COUNT,
    CATALOG,
    PRODUCTS
} from './modules/constans.js';

getData(PRODUCTS)
	.then((res) => renderCards(res, CATALOG))
	.then(() => renderBasketLength())
    .then(() => updateBasketBtnColor(getBasketFromLocalStorage()))
    .then(() => {
        const basket = getBasketFromLocalStorage();
        getBasketIds(basket, PRODUCTS)
            .then(res =>  renderBasketCards(res, '.basket__list'))
            .catch(err => console.error('Feiled to fetch', err));
    })
	.catch((err) => console.error('Something went wrong', err));

const productList = document.querySelector(CATALOG);
productList.addEventListener('click', addToBasket);

async function addToBasket(e) {
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
    const basketArray = await getBasketIds(basket, PRODUCTS);
    renderBasketCards(basketArray, '.basket__list');
}

// Удаление товара из корзины 

const basketNavBar = document.querySelector('.basket');
basketNavBar.addEventListener('click', deleteBasketCard);

function deleteBasketCard(e) {
    const targetBtn = e.target.closest('.basket__item-closeBtn');
    if (!targetBtn) return;

    const card = targetBtn.closest('.basket__item');
    if (!card) return;

    const id = card.dataset.productid;

    deleteCardFromLocalStorage(id);
    card.remove();
}

function deleteCardFromLocalStorage(id) {
    let basket = getBasketFromLocalStorage();
    basket = basket.filter(item => item !== id);
    setCardToLocalStorage(basket);
    updateBasketBtnColor(getBasketFromLocalStorage());
}