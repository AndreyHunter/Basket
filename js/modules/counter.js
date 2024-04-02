export function addCounter(e) {
    const counterBtn = e.target.closest('[data-counter]');
    if (!counterBtn) return;

    const counterWrapper = counterBtn.closest('.counter');
    const counterBody = counterWrapper.querySelector('.counter__body');

    let counter = +counterBody.textContent;

    if (counterBtn.dataset.counter === 'plus') {
        counter++;
    } else if (counterBtn.dataset.counter === 'minus') {
        counter > 1 ? counter-- : null;
    }

    counterBody.textContent = counter;
    caclulateTotalPrice();
}

export function caclulateTotalPrice() {
    const card = document.querySelectorAll('.basket__item');

    let totalPrice = 0;

    card.forEach(item => {
        const counter = item.querySelector('.counter__body');
        const currentPrice = item.querySelector('.basket__item-price');
        const sum = parseInt(counter.textContent) * parseInt(currentPrice.textContent);
        totalPrice += sum;
    });

    console.log(totalPrice);

    const totalPriceText = document.querySelector('.basket__total');
    totalPriceText.textContent = `Total: ${totalPrice} $`;   
}