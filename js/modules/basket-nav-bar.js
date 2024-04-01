export function openBasketNavBar() {
    const basketOverlay = document.querySelector('.basket');
    const basketNavBar = document.querySelector('.basket__content');
    basketOverlay.classList.add('active');
    basketNavBar.classList.add('active');

    if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
}

export function closeBasketNavBar() {
    const basketOverlay = document.querySelector('.basket');
    const basketNavBar = document.querySelector('.basket__content');
    basketOverlay.classList.remove('active');
    basketNavBar.classList.remove('active');

    if (isScrollbarVisible()) {
		toggleBodyOverflow();
	}
}

function toggleBodyOverflow() {
	document.body.style.overflow = document.body.style.overflow === '' ? 'hidden' : '';
	const scrollBarWidth = getScrollBarWidth();
	document.documentElement.style.paddingRight =
	document.body.style.overflow === 'hidden' ? scrollBarWidth + 'px' : '';
}

function getScrollBarWidth() {
	const div = document.createElement('div');
	div.style.overflow = 'scroll';
	div.style.visibility = 'hidden';
	document.body.append(div);
	const scrollBarWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollBarWidth;
}

function isScrollbarVisible() {
	return document.documentElement.scrollHeight > window.innerHeight;
}