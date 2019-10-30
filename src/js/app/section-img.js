let imgSections = document.querySelectorAll('[data-section-img]');

imgSections.forEach(section => {
    let imgContainer = addElement('div', 'section__img');
    imgContainer.style.backgroundImage = 'url(' + section.dataset.sectionImg + ')';
    section.append(imgContainer);
});
