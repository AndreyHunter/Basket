export function renderCards(data, selector) {
	const element = document.querySelector(selector);

	for (let key of data) {
		const { id, title, price, image } = key;

		const cardHTML = `
            <li class="app__card" data-productid="${id}">
                <div class="app__card-image-wrapper">
                    <a href="#!"><img src="${image}" alt="" class="app__card-image"></a>
                </div>

                <div class="app__card-about">
                    <a href="#!" class="app__card-title">${title}</a>
                    <p class="app__card-price">${price} $</p>
                </div>
                

                <button class="addToCart-btn">Add to cart</button>
            </li>
        `;

		element.insertAdjacentHTML('beforeend', cardHTML);
	}
}

export function renderBasketCards(data, selector) {
    const element = document.querySelector(selector);

    element.innerHTML = '';

    data.forEach(item => {
        const { id, title, price, image } = item;

        const basketCardHTML = `
                <li class="basket__item" data-productid="${id}">
                    <div class="basket__item-right">
                        <div class="basket__item-image-wrapper">
                            <img src="${image}" alt="${title}" class="basket__item-image">
                        </div>

                        <div class="basket__item-about">
                            <h4 class="basket__item-title">${title}</h4>
                            <div class="basket__item-price">${price} $</div>
                        </div>
                    </div>

                    <div class="basket__item-actions">
                        <div class="counter">
                            <div data-counter="minus" class="counter__btn"><</div>
                            <div class="counter__body">1</div>
                            <div data-counter="plus" class="counter__btn">></div>
                        </div>
                    </div>

                    <div class="basket__item-closeBtn">✖</div>
                </li>
            `;

        element.insertAdjacentHTML('beforeend', basketCardHTML);
    });
}

export function renderBasketEmptyMessage(selector) {
    const element = document.querySelector(selector);

    const messageHTML = `
        <div class="basket-isEmpty">
            <img src="https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg" alt="empty-basket-image">
            <p class="basket-isEmpty__text">Basket is empty</p>
        </div>
    `;

    element.insertAdjacentHTML('beforeend', messageHTML);
}