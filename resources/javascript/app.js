const bookTitle = document.querySelector('#book');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const select = document.querySelector('select');
const edit = document.querySelector('.edit-container');
const closeContainer = document.querySelector('.close');
const line = document.querySelector('#line');
const submit = document.querySelector('#submit');

let library = [];

//Book Constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Pop up for edit container
closeContainer.addEventListener('click', () => edit.style.cssText = "display: none;");

//add book object to library array on submit
submit.addEventListener('click', e => {
    e.preventDefault();
    addBookToLibrary();
}); 

//push a new book object into the array depending on the user's input
function addBookToLibrary(){ 
   const book = new Book(bookTitle.value, author.value, pages.value, select.value);
   library.push(book);
   displayBook(book); 
   
   //reset the input values
   bookTitle.value = "";
   author.value = "";
   pages.value = "";
}

//create the necessary divs to properly display each book to the page
function displayBook(book){
    const bookRowDiv = document.createElement('div');
    bookRowDiv.classList.add('book-row');
    bookRowDiv.setAttribute('data-row', library.lastIndexOf(book));
    line.after(bookRowDiv);

    const bookTitle2 = document.createElement('div');
    bookTitle2.classList.add('book-des');
    bookTitle2.textContent = book.title;
    bookRowDiv.appendChild(bookTitle2);

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('book-des');
    bookAuthor.textContent = book.author;
    bookRowDiv.appendChild(bookAuthor);

    const bookPages = document.createElement('div');
    bookPages.classList.add('book-des');
    bookPages.textContent = book.pages;
    bookRowDiv.appendChild(bookPages);

    const bookStatus = document.createElement('div');
    bookStatus.classList.add('book-des');
    bookStatus.textContent = book.read;
    bookRowDiv.appendChild(bookStatus);

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('book-des');

    //append the edit and delete buttons to the row
    const editButton = document.createElement('button');
    editButton.id = 'edit';
    editButton.textContent = 'EDIT';
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete';
    deleteButton.textContent = 'DELETE';
    buttonContainer.appendChild(deleteButton);

    bookRowDiv.appendChild(buttonContainer);

    //FOR RESPONSIVE DESIGN -- INSTEAD OF DELETE AND EDIT, RENDER AN ICON TO THE BUTTONS
    const mq = window.matchMedia("(max-width: 698px)");
    mq.addListener(WidthChange(mq, deleteButton, editButton));
    

    //remove the book div on delete
    deleteButton.addEventListener('click', e =>{
        bookRowDiv.remove();
    });

    //the edit input will be populated based on the row's value
    const editTitle = document.querySelector('#edit-book');
    const editAuthor = document.querySelector('#edit-author');
    const editPages = document.querySelector('#edit-pages');
    const editStatus = document.querySelector('#edit-select');

    editButton.addEventListener('click', e =>{
        editTitle.value = bookTitle2.textContent;
        editAuthor.value = bookAuthor.textContent;
        editPages.value = bookPages.textContent;
        editStatus.value = bookStatus.textContent;

        //display the edit container to the screen and add a button to it
        edit.style.cssText = 'display: block';
        const submitContainer = document.createElement('div');
        const submitButton = document.createElement('button');
        submitButton.id = 'edit-submit';
        submitButton.textContent = "UPDATE"

        submitContainer.appendChild(submitButton);
        edit.appendChild(submitContainer);

        //if 'UPDATE' is clicked, change the textContent of row based on the input's value
        submitButton.addEventListener('click', e =>{
            bookTitle2.textContent = editTitle.value;
            bookAuthor.textContent = editAuthor.value;
            bookPages.textContent = editPages.value;
            bookStatus.textContent = editStatus.value;
            edit.style.cssText = 'display: none';
            submitContainer.remove();
        });

        //remove the button when the edit container is exited without Update
        closeContainer.addEventListener('click', e =>{
            submitContainer.remove();
        });
    });
}

//Reponsive function based on screen size.
function WidthChange(mq, deleteButton, editButton){
    if(mq.matches){
        deleteButton.textContent = '';
        editButton.textContent = '';
        deleteButton.innerHTML = '<span class="material-icons">delete</span >'
        editButton.innerHTML = '<span class="material-icons">edit</span>'
    }
    else{
        deleteButton.textContent = 'DELETE';
        editButton.textContent = 'EDIT';
    }
}