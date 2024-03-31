'use strict';

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
    .catch(err => console.error('Something went wrong', err)); 

 
function renderCards(data, selector) {
    const element = document.querySelector(selector);

    for (let key of data) {
        const {id, title, price, image} = key;

        const cardHTML = `
            <div class="app__card" data-productid="${id}">
                <div class="app__card-image-wrapper">
                    <a href="#!"><img src="${image}" alt="" class="app__card-image"></a>
                </div>

                <div class="app__card-about">
                    <a href="#!" class="app__card-title">${title}</a>
                    <p class="app__card-price">${price}</p>
                </div>
                

                <button class="addToCard-btn">Добавить в корзину</button>
            </div>
        `


        element.insertAdjacentHTML('beforeend', cardHTML)
    }
}

const productList = document.querySelector('.app')
productList.addEventListener('click', addToBasket)

function addToBasket(e) {
    const targetBtn = e.target
    console.log(targetBtn)
}