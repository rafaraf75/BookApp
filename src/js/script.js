const booksList = document.querySelector('.books-list');
const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);

function render() {
  for (const book of dataSource.books) {
    const generatedHTML = templateBook(book);
    const bookElement = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(bookElement);
  }
}

render();