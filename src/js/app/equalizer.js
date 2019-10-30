equlize( document.querySelectorAll('.price__heading') );

function equlize(elements) {
	if (!elements) {return};
	let preparedElements = prepareElements(elements);
	let splittedbyRowElements = splitByRow(preparedElements);
	setHeights(splittedbyRowElements);

	window.addEventListener('optimizedResize', () => {
		resetStyles(elements);
		preparedElements = prepareElements(elements);
		splittedbyRowElements = splitByRow(preparedElements);
		setHeights(splittedbyRowElements);
	});
};

function prepareElements(elements) {
	let preparedElements = [];
	for (element of elements) {
		let preparedElement = {
			element: element
		};
		preparedElement.top = element.offsetTop;
		preparedElement.height = element.offsetHeight;
		preparedElements.push(preparedElement);
	};
	return preparedElements;
};

function resetStyles(elements) {
	for (element of elements) {
		element.removeAttribute('style');
	};
};

function splitByRow(elements) {
	let splittedElements = [];

	elements.reduce((prev, element, i) => {
		if (!prev.top) {
			prev.elements = [];
		} else if (prev.top != element.top) {
			splittedElements.push(prev.elements);
			prev.elements = [];
		}

		prev.elements.push(element);
		if (i === elements.length - 1) {
			splittedElements.push(prev.elements);
			return;
		}

		return {
			top: element.top,
			elements: prev.elements
		};
	}, {});

	return splittedElements;
};

function setHeights(rows) {
	for (row of rows) {
		if (row.length > 1) {
			let maxHeight = 0;
			row.forEach(element => {
				if (element.height > maxHeight) {
					maxHeight = element.height;
				};
			})
			for (element of row) {
				element.element.style.minHeight = maxHeight + 'px';
			};
		}
	};
};
