




















































const BookList = [];
const tableBody = document.querySelector(".table-body");
const submitBtn = document.querySelector("#submit-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusSelect = document.querySelector("#status");

submitBtn.onclick = (event) => {
  event.preventDefault();
  if(titleInput.value.trim().length == 0 || authorInput.value.trim().length == 0){
    alert("Fill all the inputs");
  }else{
    addBook(new Book(titleInput.value, authorInput.value, pagesInput.value, (statusSelect.value == "true")));
    titleInput.value = null;
    authorInput.value = null;
    pagesInput.value = null;
    statusSelect.value = null;
  }

}

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.info = function() {
    return this.title + ", " + this.pages + " pages, readed: " + this.read;
  };
  this.setStatus = function(){
    this.status = !this.status
  }
}

function addBook(book) {
  BookList.push(book);
  console.log("Book Created!", book);
  render();
}


function render() {
  tableBody.innerHTML = "";
  BookList.forEach((book, index) => {
    let tr = document.createElement("tr");

    let td = document.createElement("td");
    td.appendChild(document.createTextNode(index+1));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(book.title));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(book.author));
    tr.appendChild(td);

    td = document.createElement("td");
    td.appendChild(document.createTextNode(book.pages));
    tr.appendChild(td);

    td = document.createElement("td");
    //td.appendChild(document.createTextNode(book.status));
    btn = document.createElement("button");
    btn.classList.add("btn")
    if(!book.status){
      btn.classList.add("btn-outline-info")
      btn.innerHTML = "Reading";
    }else{
      btn.classList.add("btn-success")
      btn.innerHTML = "Read";
    }
    btn.onclick = () => {
      console.log(book, index);
      //BookList[index].setStatus();
      book.setStatus();
      render();
    };
    td.appendChild(btn);
    tr.appendChild(td);

    td = document.createElement("td");
    btn = document.createElement("button");
    btn.classList.add("btn")
    btn.classList.add("btn-danger")
    btn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    btn.onclick = () => {
      BookList.splice(index, 1);
      render();
    };
    td.appendChild(btn);
    tr.appendChild(td);

    tableBody.appendChild(tr);
  });
}
