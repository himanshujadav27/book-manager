let bookTitle_Input = document.getElementById("bookTitle_Input");
let authorInput = document.getElementById("authorInput");
let add_book = document.getElementById("add_book");
let clear_btn = document.getElementById("clear_btn");
let error_msg = document.getElementById("error_msg");
let book_count = document.getElementById("book_count");
let recordTable = document.getElementById("recordTable");


let books = JSON.parse(
    localStorage.getItem("books") 
    ) || [];

displayBooks();
bookCount();


function bookCount() {

    book_count.innerHTML = "Total books: " + books.length;

}


add_book.addEventListener("click", () => {

    if(bookTitle_Input.value === "") {

        error_msg.innerHTML = "Enter book name.";

    }
    
    else if(authorInput.value === "") {

        error_msg.innerHTML = "Enter author name.";         

    }
    else {

     if(bookTitle_Input.value.trim() !== "" && authorInput.value.trim() !== ""){

         error_msg.innerHTML = "";

         books.push({

             title: bookTitle_Input.value,

             author: authorInput.value

         });    

         bookCount();
         saveBooks();
         displayBooks();

     }

     else{

         error_msg.innerHTML = "Record empty!"

     }

    }

})

function displayBooks(){

    bookTitle_Input.value = "";
    authorInput.value = "";
    recordTable.innerHTML = "";

    for(let i = 0; i < books.length; i++){

        recordTable.innerHTML += 
    
        `<tr>

            <td>${i+1}</td>
        
            <td>${books[i].title}</td>
            
            <td>${books[i].author}</td>
        
            <td><button id="editButton" onclick="editBook(${i})">Edit book</button></td>
        
            <td><button id="deleteButton" onclick="deleteBook(${i})">Delete book</button></td>
        
        </tr>`

    }

}

clear_btn.addEventListener("click", () => {


    if(books.length == 0) {

        error_msg.innerHTML = "No records to delete."

    }
    
    else {

        let result = confirm("Are you sure?");
        

        if(result){

            books = [];

            bookCount();
            saveBooks();
            displayBooks();
        
        }

    }

})

function editBook(index){

    let choice = prompt("What you want to edit?\n.1 Title \n2. Author");

    if(choice === "1"){

        let newTitle = prompt("Enter new title");

            if(newTitle !== null && newTitle.tdim() !== ""){

                books[index].title = newTitle;
                saveBooks();

            }
    }
    else if(choice === "2"){

        let newAuthor = prompt("Enter new author name");

            if (newAuthor !== null && newAuthor.tdim() !== ""){

                books[index].author = newAuthor;
                saveBooks();

            }
    }
    else {
        alert("Invalid choice!");
    }
    displayBooks();

}

function deleteBook(index) {

    let result = confirm("Are you sure?");

    if(result) {

        books.splice(index, 1);
        
        bookCount();
        saveBooks();
        displayBooks();

    }

}

function saveBooks(){

    localStorage.setItem("books", JSON.stringify(books));

}