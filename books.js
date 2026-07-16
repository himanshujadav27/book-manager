let bookTitle_Input = document.getElementById("bookTitle_Input");
let authorInput = document.getElementById("authorInput");
let add_book = document.getElementById("add_book");
let clear_btn = document.getElementById("clear_btn");
let error_msg = document.getElementById("error_msg");
let book_count = document.getElementById("book_count");
let recordTable = document.getElementById("recordTable");
const searchInput = document.getElementById("searchInput");


let books = JSON.parse(
    localStorage.getItem("books") 
    ) || [];

displayBooks();
bookCount();

authorInput.addEventListener("keydown", () => {

    if(event.key == "Enter") {

        add_book.click();

    }

})



searchInput.addEventListener("input", searchBooks);

function searchBooks() {

        recordTable.innerHTML = "";

        let searchText = searchInput.value.toLowerCase();

            if(searchText === ""){

                displayBooks();

                return;

            }


        let found = false;

        for(let i = 0; i < books.length; i++) {

            let title = books[i].title.toLowerCase();

            let author = books[i].author.toLowerCase();

            if(title.includes(searchText) || author.includes(searchText)) {
                
            found = true;

            recordTable.innerHTML += 

                        `<tr>

                            <td>${i+1}</td>

                            <td>${books[i].title}</td>

                            <td>${books[i].author}</td>

                            <td><button class="editButton" onclick="editBook(${i})">✏️ Edit</button></td>

                            <td><button class="deleteButton" onclick="deleteBook(${i})">🗑️ Delete</button></td>

                        </tr>`


            }

        }

        if(!found){

                recordTable.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-message">
                            🔍 No matching books found.
                        </td>
                    </tr>
                `;
        }

    }


function bookCount() {

    book_count.innerHTML = "📚 Total books: " + books.length;

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

             title: bookTitle_Input.value.trim(),

             author: authorInput.value.trim()

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

    if(books.length === 0) {

        recordTable.innerHTML = `
                                <tr>
                                    <td class="empty-message" colspan="5">
                                        📚 No books added yet.
                                    </td>
                                </tr>`;

    }

    for(let i = 0; i < books.length; i++){

        recordTable.innerHTML += 
    
        `<tr>

            <td>${i+1}</td>
        
            <td>${books[i].title}</td>
            
            <td>${books[i].author}</td>
        
            <td><button class="editButton" onclick="editBook(${i})">✏️ Edit</button></td>
        
            <td><button class="deleteButton" onclick="deleteBook(${i})">🗑️ Delete</button></td>
        
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

    let choice = prompt(`Edit Book 1. Edit Title 2. Edit Author`);

    if(choice === "1"){

        let newTitle = prompt("Enter new title");

            if(newTitle !== null && newTitle.trim() !== ""){

                books[index].title = newTitle;
                saveBooks();

            }
    }
    else if(choice === "2"){

        let newAuthor = prompt("Enter new author name");

            if (newAuthor !== null && newAuthor.trim() !== ""){

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