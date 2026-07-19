let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", finished: true },
  { id: 2, title: "1984", author: "George Orwell", finished: false },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", finished: true },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", finished: false },
  { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", finished: true },
  { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger", finished: false }
];

const booksList = document.querySelector("#books-list");
const emptyState = document.querySelector("#empty-state");

const render = () => {
  booksList.innerHTML = "";

  if (books.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  books.map((value) => {
    const li = document.createElement("li");
    const infoSpan = document.createElement("span");
    
    if (value.finished === true) {
      const del = document.createElement("del");
      del.innerText = `${value.title} - ${value.author}`;
      infoSpan.appendChild(del);
    } else {
      infoSpan.innerText = `${value.title} - ${value.author}`;
    }
    
    const inputCheckbox = document.createElement("input");
    const buttonDelete = document.createElement("button");
    inputCheckbox.type = "checkbox";
    buttonDelete.textContent = "Delete";
    inputCheckbox.onchange = () => complete(value.id);
    inputCheckbox.checked = value.finished;
    buttonDelete.onclick = () => deleteTask(value.id);
    
    li.append(infoSpan, inputCheckbox, buttonDelete);
    booksList.appendChild(li);

    updateSummary();
  });
};

const complete = (id) => {
  const changed = books.map((item) => {
    if (item.id === id) {
      return { ...item, finished: !item.finished };
    } else {
      return item;
    }
  });
  books = changed;
  render();
};

const deleteTask = (id) => {
  const isConfirmed = confirm("Remove this book?");
  if (isConfirmed) {
    const filteredBooks = books.filter((value) => {
      if (value.id !== id) {
        return true;
      } else {
        return false;
      }
    });
    books = filteredBooks;
    render();
  }
};

const addNewBook = () => {
  const formInputTitle = document.querySelector("#form-input-title");
  const formInputAuthor = document.querySelector("#form-input-author");

  if (formInputTitle.value.trim() === "" || formInputAuthor.value.trim() === "") {
    alert("Ma'lumotlarni to'liq to'ldiring") 
    return
  }

  books.push({ 
    id: books.length + 1, 
    title: formInputTitle.value, 
    author: formInputAuthor.value, 
    finished: false 
  });
  
  formInputTitle.value = "";
  formInputAuthor.value = "";
  render();
};

const updateSummary = () => {
  const total = books.length;
  const finished = books.filter(item => item.finished).length;
  const toRead = total - finished;

  document.querySelector("#total-books").innerText = total;
  document.querySelector("#finished-books").innerText = finished;
  document.querySelector("#unread-books").innerText = toRead;
};

render();
