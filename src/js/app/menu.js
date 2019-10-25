let menuToggler = document.querySelector('.page-header__menu-toggler'),
	menu = document.querySelector('.page-header__menu');

if (menuToggler && menu) {
	menuTogglerListener();
};

function menuTogglerListener() {
	menu.classList.add('page-header__menu_closed');
	menuToggler.addEventListener('click', () => {
		menu.classList.toggle('page-header__menu_closed');
		menu.classList.toggle('page-header__menu_opened');

		menuToggler.classList.toggle('page-header__menu-toggler_active');
	});
};
