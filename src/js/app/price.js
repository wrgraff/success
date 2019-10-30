if (window.innerWidth >= 960) {
	initPriceTitles( document.querySelectorAll('.price__item') );
} else {
	window.addEventListener('optimizedResize', function listenToInitPrices() {
		if (window.innerWidth >= 960) {
			initPriceTitles( document.querySelectorAll('.price__item') );
			window.removeEventListener('optimizedResize', listenToInitPrices);
		};
	});
};

function initPriceTitles(items) {
	if (!items) {return};
	for (item of items) {
		let itemTitleCopy = addElement('p', 'price__title-copy');
		itemTitleCopy.textContent = item.querySelector('.price__title').textContent;

		item.classList.add('price__item_extended');
		item.querySelector('.price__description').prepend(itemTitleCopy);
	};
};
