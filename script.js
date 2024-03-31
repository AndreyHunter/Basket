'use strict';

import { 
    getBasketFromLocalStorage,
    setCardToLocalStorage,
    renderBasketLength
} from './localStorage.js';

import {renderCards} from './render.js'

async function getPhotos(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error;
        }
        
        return res.json()

    } catch (err) {
        console.error('ERROR: Failed to fetch data', err);
    }
}

getPhotos('https://fakestoreapi.com/products')
    .then(res => renderCards(res, '.app'))
    .then(() => renderBasketLength()) 
    .catch(err => console.error('Something went wrong', err)); 


const productList = document.querySelector('.app')
productList.addEventListener('click', addToBasket)

function addToBasket(e) {
    const targetBtn = e.target.closest('.addToCart-btn')
    
    if (!targetBtn) return

    const card = targetBtn.closest('.app__card')

    if (!card) return

    const id = card.dataset.productid

    let basket = getBasketFromLocalStorage()

    if (!Array.isArray(basket)) {
        basket = []
    }
 
   if (basket.includes(id)) {
        const index = basket.indexOf(id)
        basket.splice(index, 1)
   } else {
        basket.push(id)
   }

    setCardToLocalStorage(basket) 
    
}

