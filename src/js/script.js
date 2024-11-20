const booksList = document.querySelector('.books-list');
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const filters = [];

function render() {
  booksList.innerHTML = '';

  for (const book of dataSource.books) {
    const shouldBeHidden =
      (filters.includes('adults') && !book.details.adults) ||
      (filters.includes('nonFiction') && !book.details.nonFiction);

    if (!shouldBeHidden) {
      const generatedHTML = templateBook(book);
      const bookElement = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(bookElement);
    }
  }
}

function initActions() {
  const filtersContainer = document.querySelector('.filters');

  filtersContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;
    if (
      event.target.tagName === 'INPUT' &&
            event.target.type === 'checkbox' &&
            event.target.name === 'filter'
    ) {
      const filterValue = clickedElement.value;

      if (clickedElement.checked && !filters.includes(filterValue)) {
        filters.push(filterValue);
      } else if (!clickedElement.checked && filters.includes(filterValue)) {
        const index = filters.indexOf(filterValue);
        filters.splice(index, 1);
      }
      console.log('Current Filters:', filters);
    }
  });
}
render();
initActions();
