const booksList = document.querySelector('.books-list');
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const filters = [];

function render() {
  booksList.innerHTML = '';

  for (const book of dataSource.books) {
    const generatedHTML = templateBook(book);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookElement);
  }
  filterBooks();
}


function filterBooks() {
  for (const book of dataSource.books) {
    let shouldBeHidden = false;

    for (const filter of filters) {
      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }

    const bookElement = document.querySelector(`.book__image[data-id="${book.id}"]`);

    if (bookElement)
      if (shouldBeHidden) {
        bookElement.classList.add('hidden');
      } else {
        bookElement.classList.remove('hidden');
      }
  }
}

function initActions() {
  const filtersForm = document.querySelector('.filters');

  filtersForm.addEventListener('click', function (event) {
    if (
      event.target.tagName === 'INPUT' &&
            event.target.type === 'checkbox' &&
            event.target.name === 'filter'
    ) {
      const filterValue = event.target.value;

      if (event.target.checked && !filters.includes(filterValue)) {
        filters.push(filterValue);
      } else if (!event.target.checked && filters.includes(filterValue)) {
        const index = filters.indexOf(filterValue);
        filters.splice(index, 1);
      }
      console.log('Current Filters:', filters);
      filterBooks();
    }
  });
}
render();
initActions();

