import {
	getBasketFromLocalStorage,
	setCardToLocalStorage,
	renderBasketLength,
    updateBasketBtnColor,
    getBasketIds
} from './modules/localStorage.js';

import { 
    renderCards,
    renderBasketCards,
    renderBasketEmptyMessage
 } from './modules/render.js';
import { getData } from './modules/requests.js';
import { 
    CARDS_VIEV_COUNT,
    CATALOG,
    PRODUCTS
} from './modules/constans.js';

import {
    openBasketNavBar, 
    closeBasketNavBar
} from './modules/basket-nav-bar.js';

import { 
    addCounter,
    caclulateTotalPrice
} from './modules/counter.js';

// Получение и инициализация товаров

getData(PRODUCTS)
	.then((res) => renderCards(res, CATALOG))
	.then(() => renderBasketLength())
    .then(() => updateBasketBtnColor(getBasketFromLocalStorage()))
    .then(() => {
        const basket = getBasketFromLocalStorage();
        getBasketIds(basket, PRODUCTS)
            .then(res =>  renderBasketCards(res, '.basket__list'))
            .then(() => checkBasketLength())
            .then(() =>  caclulateTotalPrice())
            .catch(err => console.error('Feiled to fetch', err));
    })
	.catch((err) => console.error('Something went wrong', err));

// Открытие и закрытие корзины

document.querySelector('.basket-open').addEventListener('click', () => openBasketNavBar());

document.addEventListener('keydown', (e) => {
	const basket = document.querySelector('.basket');
	if (e.code === 'Escape' && basket.classList.contains('active')) {
        closeBasketNavBar();
	} else {
		return;
	}
});

window.addEventListener('click', (e) => {
    const target = e.target;
    const closeBtn = target.closest('[data-close-cart]');
    const basketModal = document.querySelector('.basket__content');
    if (!basketModal.classList.contains('active')) return;

    if (closeBtn || target.classList.contains('basket')) closeBasketNavBar();
});

// Счётчик 
const basketWrapper = document.querySelector('.basket__content');
basketWrapper.addEventListener('click', addCounter);


// Добавление товара в корзину
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
    openBasketNavBar();
    caclulateTotalPrice();
}

// Удаление товара из корзины 

const basketNavBar = document.querySelector('.basket__content');
basketNavBar.addEventListener('click', deleteBasketCard);

function deleteBasketCard(e) {
    const targetBtn = e.target.closest('.basket__item-closeBtn');
    if (!targetBtn) return;

    const card = targetBtn.closest('.basket__item');
    if (!card) return;

    const id = card.dataset.productid;

    deleteCardFromLocalStorage(id);
    card.remove();
    checkBasketLength();
    caclulateTotalPrice();
}

function deleteCardFromLocalStorage(id) {
    let basket = getBasketFromLocalStorage();
    basket = basket.filter(item => item !== id);
    setCardToLocalStorage(basket);
    updateBasketBtnColor(getBasketFromLocalStorage());
}

// Функция проверки на пустую корзину

function checkBasketLength() {
    const basketList = document.querySelector('.basket__list');

    if (basketList.children.length === 0) {
        renderBasketEmptyMessage('.basket__list');
    }
}