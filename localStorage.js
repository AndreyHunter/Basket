export function setCardToLocalStorage(basket) {
   localStorage.setItem('basket', JSON.stringify(basket))
}

export function getBasketFromLocalStorage() {
    const basketItems = localStorage.getItem('basket')
    return basketItems ? JSON.parse(basketItems) : []
}
