const microModalLinks = document.querySelectorAll('a[data-modal]');
microModalLinks.forEach((link) => {
    link.addEventListener('click', (evt) => {
		if (document.querySelector('#' + link.dataset.modal)) {
			evt.preventDefault();
			MicroModal.show(link.dataset.modal);
		}
	});
});

const microModalCloses = document.querySelectorAll('[data-modal-close]');
microModalCloses.forEach((button) => {
    button.addEventListener('click', () => {
		MicroModal.close(button.closest('.modal').getAttribute('id'));
	});
});
