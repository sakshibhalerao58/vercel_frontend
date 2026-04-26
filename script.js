const API = "https://vercel-backend-1-elwp.onrender.com/";

// LOAD BOOKS
async function getBooks() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    display(data);
  } catch (err) {
    alert("Error loading books");
    console.error(err);
  }
}

// DISPLAY
function display(books) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  books.forEach(book => {
    list.innerHTML += `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.year}</td>
      </tr>
    `;
  });
}

// ADD BOOK
document.getElementById("bookForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, author, year })
    });

    const data = await res.json();

    console.log("Added:", data);
    alert("Book added successfully!");

    this.reset();
    getBooks();

  } catch (err) {
    alert("Error adding book");
    console.error(err);
  }
});

// SEARCH
async function searchBooks() {
  const q = document.getElementById("searchInput").value;

  try {
    const res = await fetch(API + "/search?q=" + q);
    const data = await res.json();
    display(data);
  } catch (err) {
    alert("Search error");
    console.error(err);
  }
}

// INIT
getBooks();