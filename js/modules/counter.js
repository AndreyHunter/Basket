export function addCounter(e) {
    const counterBtn = e.target.closest('[data-counter]');
    if (!counterBtn) return;

    const counterWrapper = counterBtn.closest('.counter');
    const counterBody = counterWrapper.querySelector('.counter__body');

    let counter = +counterBody.textContent;

    if (counterBtn.dataset.counter === 'plus') {
        counter++;
    } else if (counterBtn.dataset.counter === 'minus') {
        counter > 0 ? counter-- : null;
    }

    counterBody.textContent = counter;
}