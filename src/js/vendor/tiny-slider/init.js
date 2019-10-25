const feedbacksList = document.querySelector('.feedbacks__list');
if (feedbacksList) {
	feedbacksList.className = "feedbacks__list";
	const feedbacksSlider = tns({
	  container: feedbacksList,
	  items: 1,
	  nav: false,
	  controlsText: ["<span class='visually-hidden'>Предыдущий отзыв<span class='visually-hidden'>", "<span class='visually-hidden'>Следующий отзыв</span>"]
	});
};
