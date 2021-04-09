let myLibrary = loadLocalStorage();

function loadLocalStorage() {
  let library = JSON.parse(localStorage.getItem("myLibrary"));
  renderTable(library);
  handleUpdateBooksNumber(library);
  return library;
}

function populateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function Book(title, author, pageNum, isRead, id) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.isRead = isRead;
  this.id = id;
  this.info = () =>
    this.isRead
      ? `${this.title} by ${author}, ${pageNum} pages, read`
      : `${this.title} by ${author}, ${pageNum} pages, not read yet`;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function renderTable(myLibrary) {
  const tbody = document.querySelector("tbody");
  const newTableBody = document.createElement("tbody");
  tbody.replaceWith(newTableBody);
  myLibrary.forEach(item => {
    row = document.createElement("tr");
    newTableBody.append(row);
    const { title, author, pageNum, isRead, id: bookId } = item;
    const cols = [title, author, pageNum, isRead];
    deleteCol = document.createElement("td");
    deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-delete";
    deleteBtn.textContent = "DELETE";
    deleteBtn.onclick = function () {
      handleDelete(bookId);
    };
    deleteCol.append(deleteBtn);
    cols.forEach(col => {
      colItem = document.createElement("td");
      if (col === isRead) {
        colItem.textContent = item.isRead ? "READ" : "UNREAD";
        colItem.className = "isRead";
        colItem.onclick = () => {
          handleChangeRead(bookId);
        };
      } else {
        colItem.textContent = col;
      }
      row.append(colItem);
    });
    row.append(deleteCol);
  });
}

function clearForm() {
  document.getElementById("titleInputText").value = "";
  document.getElementById("authorInputText").value = "";
  document.getElementById("pageNumInputText").value = "";
  document.getElementById("readCheck").checked = false;
}
// Get Data from clicking submit button
document.getElementById("book__form").onsubmit = function (e) {
  e.preventDefault();
  let bookTitle = document.getElementById("titleInputText").value;
  let bookAuthor = document.getElementById("authorInputText").value;
  let bookPageNum = document.getElementById("pageNumInputText").value;
  let bookIsRead = document.getElementById("readCheck").checked;
  let bookId = Math.random();
  addBookToLibrary(
    new Book(bookTitle, bookAuthor, bookPageNum, bookIsRead, bookId)
  );
  populateLocalStorage();
  renderTable(myLibrary);
  handleUpdateBooksNumber(myLibrary);
  clearForm();
};

function handleDeleteAll() {
  myLibrary = [];
  populateLocalStorage();
  renderTable(myLibrary);
  handleUpdateBooksNumber(myLibrary);
}

function handleDelete(bookId) {
  myLibrary = myLibrary.filter(item => item.id !== bookId);
  populateLocalStorage();
  renderTable(myLibrary);
  handleUpdateBooksNumber(myLibrary);
}

function handleUpdateBooksNumber(myLibrary) {
  document.querySelector(".total-book").textContent = myLibrary.length;
  const booksRead = myLibrary.filter(item => item.isRead === true);
  document.querySelector(".book-read").textContent = booksRead.length;
  document.querySelector(".book-unread").textContent =
    myLibrary.length - booksRead.length;
}

function handleChangeRead(bookId) {
  myLibrary.find(item => item.id === bookId).isRead = !myLibrary.find(
    item => item.id === bookId
  ).isRead;
  populateLocalStorage();
  renderTable(myLibrary);
  handleUpdateBooksNumber(myLibrary);
}

document.getElementById("delete all").onclick = function () {
  handleDeleteAll();
};
