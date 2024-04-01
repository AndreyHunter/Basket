export function openBasketNavBar(selector, activeClass) {
    const element = document.querySelector(selector);
    element.classList.add(activeClass);
}

export function closeBasketNavBar(selector, activeClass) {
    const element = document.querySelector(selector);
    element.classList.remove(activeClass);
}