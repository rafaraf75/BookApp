const booksList = document.querySelector('.books-list');
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const filters = [];

function render() {
  booksList.innerHTML = '';

  for (const book of dataSource.books) {
    const ratingWidth = book.rating * 10;
    const ratingBgc = determineRatingBgc(book.rating);

    const bookData = {
      id: book.id,
      name: book.name,
      price: book.price,
      rating: book.rating,
      image: book.image,
      details: book.details,
      ratingWidth: ratingWidth, // Dodanie szerokości paska
      ratingBgc: ratingBgc, // Dodanie tła gradientu
    };
    const generatedHTML = templateBook(bookData);
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

function determineRatingBgc(rating) {
  let background = '';

  if (rating < 6) {
    background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
  } else if (rating > 6 && rating <= 8) {
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }

  return background;
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

