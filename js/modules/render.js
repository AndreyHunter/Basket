export function renderCards(data, selector) {
	const element = document.querySelector(selector);

	for (let key of data) {
		const { id, title, price, image } = key;

		const cardHTML = `
            <div class="app__card" data-productid="${id}">
                <div class="app__card-image-wrapper">
                    <a href="#!"><img src="${image}" alt="" class="app__card-image"></a>
                </div>

                <div class="app__card-about">
                    <a href="#!" class="app__card-title">${title}</a>
                    <p class="app__card-price">${price} $</p>
                </div>
                

                <button class="addToCart-btn">Добавить в корзину</button>
            </div>
        `;

		element.insertAdjacentHTML('beforeend', cardHTML);
	}
}
