class book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class ui {
     static display() {
    //     const prebooks = [
    //         {
    //             title: 'hello',
    //             author: 'abc',
    //             isbn: 'jaz'
    //         },
    //         {
    //             title: 'hello',
    //             author: 'abc',
    //             isbn: 'jaz'
    //         }

    //     ];
    //     //const books=prebooks;
        const books = store.getbook();
        //console.log(books);
         books.forEach((book)=>ui.addBookToList(book))
        
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="btn btn-danger  btn-sm delete">x</a></td>
        `;
        list.appendChild(row);
    }
    static clearfield() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';

    }
    static showalert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deletebook(el) {
        if (el.classList.contains('delete')) {
            if (confirm("are you really want to delete?")) {
                el.parentElement.parentElement.remove();
            }
        }
    }

}
class store{
    static getbook(){
        let books;
        if(localStorage.getItem("books")===null)
        {
            books=[];
        }
        else{
           books=JSON.parse(localStorage.getItem("books"));
        }
        return books;
            }
            static addbook(book){
                let books=store.getbook();
              //  console.log("book"+books);
                books.push(book);
                localStorage.setItem("books",JSON.stringify(books));
            }
            static remove(isbn)
            {
                const books=store.getbook();
                books.array.forEach((book,index) => {
                    if(book.isbn===isbn)
                    books.splice(index,1);
                });
                localStorage.setItem('books',JSON.stringify(books));
            }
    }
document.addEventListener('DOMContentLoaded', ui.display());
document.querySelector("#book-form").addEventListener("submit", (p) => {
    p.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    //console.log(title + "--" + author + "--" + isbn);
    if (title === "" || author === "" || isbn === "") {
        ui.showalert("Fill all the Fields", "danger")
    } else {
        const Book = new book(title, author, isbn);

        ui.addBookToList(Book);
        store.addbook(Book);
        ui.clearfield();
        ui.showalert("book added successfully", "success");
       // console.log(book);
    }
});
document.querySelector("#book-list").addEventListener("click", (e) => {
    //console.log(e.target);
    ui.deletebook(e.target);

    ui.showalert("Deleted successfully", "success");
})