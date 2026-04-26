let books = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = -1;

const form = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

// DISPLAY ALL BOOKS (READ)
function displayBooks() {
  bookList.innerHTML = "";

  books.forEach((book, index) => {
    bookList.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>
          <button class="edit" onclick="editBook(${index})">Edit</button>
          <button class="delete" onclick="deleteBook(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("books", JSON.stringify(books));
}

// ADD / UPDATE BOOK (CREATE + UPDATE)
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  const book = { title, author, year };

  if (editIndex === -1) {
    books.push(book); // CREATE
  } else {
    books[editIndex] = book; // UPDATE
    editIndex = -1;
  }

  form.reset();
  displayBooks();
});

// EDIT
function editBook(index) {
  const book = books[index];

  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("year").value = book.year;

  editIndex = index;
}

// DELETE
function deleteBook(index) {
  books.splice(index, 1);
  displayBooks();
}

// SEARCH (Button Trigger)
function searchBooks() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(keyword) ||
    book.author.toLowerCase().includes(keyword) ||
    book.year.toString().includes(keyword)
  );

  displayFilteredBooks(filtered);
}

// DISPLAY FILTERED RESULTS
function displayFilteredBooks(filteredBooks) {
  bookList.innerHTML = "";

  if (filteredBooks.length === 0) {
    bookList.innerHTML = `<tr><td colspan="4">No books found</td></tr>`;
    return;
  }

  filteredBooks.forEach((book) => {
    bookList.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>-</td>
      </tr>
    `;
  });
}

// RESET SEARCH
function resetSearch() {
  document.getElementById("searchInput").value = "";
  displayBooks();
}

// INITIAL LOAD
displayBooks();