const API = "http://localhost:5000/api/books"; // change if deployed

let editId = null;

// GET BOOKS
async function getBooks() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    display(data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

// DISPLAY
function display(books) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  if (!books || books.length === 0) {
    list.innerHTML = `<tr><td colspan="4">No books found</td></tr>`;
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

// ADD / UPDATE
document.getElementById("bookForm").addEventListener("submit", async e => {
  e.preventDefault();

  const book = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    year: document.getElementById("year").value
  };

  try {
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
  } catch (err) {
    console.error("Add Error:", err);
  }
});

// DELETE
async function deleteBook(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  getBooks();
}

// EDIT
function editBook(id, t, a, y) {
  document.getElementById("title").value = t;
  document.getElementById("author").value = a;
  document.getElementById("year").value = y;
  editId = id;
}

// SEARCH
async function searchBooks() {
  const q = document.getElementById("searchInput").value;

  try {
    const res = await fetch(API + "/search?q=" + q);
    const data = await res.json();
    display(data);
  } catch (err) {
    console.error("Search Error:", err);
  }
}

// INIT
getBooks();