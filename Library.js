document.addEventListener('DOMContentLoaded', () => {
    const bookList = [];

    // Display books in the table
    function displayBooks() {
        const tableBody = document.querySelector('#book-list tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        bookList.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isIssued ? 'Issued' : 'Available'}</td>
                <td>
                    ${book.isIssued ? `
                        <button class="return-btn" onclick="returnBook(${index})">Return</button>
                    ` : `
                        <button onclick="issueBook(${index})">Issue</button>
                    `}
                    <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Add a new book
    function addBook(event) {
        event.preventDefault(); // Prevent form submission

        const title = document.querySelector('#book-title').value.trim();
        const author = document.querySelector('#book-author').value.trim();

        if (title && author) {
            const newBook = {
                title: title,
                author: author,
                isIssued: false
            };
            bookList.push(newBook); // Add new book to the list

            document.querySelector('#add-book-form').reset(); // Reset form
            displayBooks(); // Refresh table
        }
    }

    // Issue a book
    function issueBook(index) {
        bookList[index].isIssued = true;
        displayBooks();
    }

    // Return a book
    function returnBook(index) {
        bookList[index].isIssued = false;
        displayBooks();
    }

    // Remove a book
    function removeBook(index) {
        bookList.splice(index, 1); // Remove book from the list
        displayBooks(); // Refresh table
    }

    // Attach event listener for form submission
    document.querySelector('#add-book-form').addEventListener('submit', addBook);

    // Expose functions to global scope for dynamic buttons
    window.issueBook = issueBook;
    window.returnBook = returnBook;
    window.removeBook = removeBook;
});
