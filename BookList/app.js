class Book
{
    constructor(title, author, isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class View
{
    AddBook(book)
    {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="delete"><i class="far fa-trash-alt"></i></a></td>`;
        document.getElementById('books').appendChild(row);
    }

    deleteBook(evt)
    {
        if(evt.target.parentElement.className == 'delete')
            if(confirm('Are you sure?'))
            {
                evt.target.parentElement.parentElement.parentElement.remove();
                // removeFromStorage(evt.target.parentElement.parentElement)
            }  
    }

    showMessage(message, className)
    {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        // Get form
        const form = document.getElementById('book-form');
        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearInput()
    {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('ISBN').value = '';
    }

}

class Storage
{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('Books') === null)
            books = [];
        else
            books = JSON.parse(localStorage.getItem('Books'));
        return books;
    }

    static displayBooks()
    {
        let books = Storage.getBooks();
        const view = new View();
        books.forEach((e)=>{
            view.AddBook(e);
        })
    }

    static AddBook(book)
    {
        let books = Storage.getBooks();

        books.push(book);

        localStorage.setItem('Books', JSON.stringify(books));
    }

    static removeBooks(isbn)
    {
        let books = Storage.getBooks();
        books.forEach((book, index)=>{
            if(book.isbn == isbn)
            {
                books.splice(index, 1);
            }      
        })
        localStorage.setItem('Books', JSON.stringify(books));
    }
}


document.addEventListener('DOMContentLoaded', Storage.displayBooks);

// add event 

document.getElementById('book-form').addEventListener('submit', (evt)=>
{
    // UI var 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('ISBN').value;

    const book = new Book(title, author, isbn);

    const view = new View();


    if(title == '' || author == '' || isbn == '')
    {
        view.showMessage('Please fill in all fields', 'alert-danger');
    }
    else
    {
        view.AddBook(book);
        view.showMessage('Book Added!', 'alert-success');
        Storage.AddBook(book);
    }
    view.clearInput();
    evt.preventDefault();
});

document.getElementById('books').addEventListener('click', (evt)=>
{
    const view = new View();
    view.deleteBook(evt);

    Storage.removeBooks(evt.target.parentElement.parentElement.previousElementSibling.innerHTML);
    view.showMessage('Book Removed!', 'alert-success');
});

