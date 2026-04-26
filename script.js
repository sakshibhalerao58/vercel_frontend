const API = "http://localhost:5000/api/books";
let editId = null;

// Load Books
async function getBooks() {
  const res = await fetch(API);
  const data = await res.json();
  display(data);
}

// Display
function display(books) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (books.length === 0) {
    list.innerHTML = `<tr><td colspan="4">No books found 📭</td></tr>`;
    return;
  }

  books.forEach(book => {
    list.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
        <td>
          <button onclick="editBook('${book._id}','${book.title}','${book.author}','${book.year}')">Edit</button>
          <button onclick="deleteBook('${book._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add / Update
document.getElementById("bookForm").addEventListener("submit", async e => {
  e.preventDefault();

  const book = {
    title: title.value,
    author: author.value,
    year: year.value
  };

  if (editId) {
    await fetch(API + "/" + editId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    editId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
  }

  e.target.reset();
  getBooks();
});

// Edit
function editBook(id, t, a, y) {
  title.value = t;
  author.value = a;
  year.value = y;
  editId = id;
}

// Delete
async function deleteBook(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  getBooks();
}

// Search
async function searchBooks() {
  const q = document.getElementById("searchInput").value;
  const res = await fetch(API + "/search?q=" + q);
  const data = await res.json();
  display(data);
}

// Init
getBooks();