function refreshBookList(books) {
    $("#booklist").html('');
    if (books) {
        $("#booklist").listview();
        books.forEach(function (book) {
            book.genre = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
            $("#booklist").append('<li><a class="booklist-item" href="#book" data-transition="slide"><img src="' + book.image + '" /><h2>' + book.title + '</h2><p>' + book.author + ' | ' + book.genre + '</p><span class="ui-li-count">' + book.price + '</span></a></li>');
        });
        $("#booklist").listview("refresh");

        // apply books list-specific css, requires corresponding markup in html
        $('.booklist-item > h2, p').css('width', '82%');
    }
}

function sortBooks(books) {
    return jQuery.grep(books, function (book) {
        if ($("#genre").val() != 'all-genres') {
            return ((book.genre.toLowerCase() == $("#genre").val().toLowerCase()) && (parseFloat(book.price) <= parseFloat($('#price').val())));
        } else {
            return (parseFloat(book.price) <= parseFloat($('#price').val()));
        }
    });
}

$(function () {
    // TODO: replace this and assign actually data retrieved from the backend
    const books = [
        {
            "id": 1,
            "title": "Harry Potter and the Philosopher's Stone",
            "author": "J. K. Rowling",
            "image": "../assets/common/images/hpfs.jpg",
            "genre": "fantasy",
            "description": "",
            "price": "1614.34"
        },
        {
            "id": 2,
            "title": "Tender Is The Night",
            "author": "F. Scott Fitzgerald",
            "image": "../assets/common/images/hpfs.jpg",
            "genre": "classic",
            "description": "",
            "price": "1977.47"
        },
        {
            "id": 3,
            "title": "The Daily Stoic",
            "author": "Ryan Holiday & Stephen Hanselman",
            "image": "../assets/common/images/hpfs.jpg",
            "genre": "nonfiction",
            "description": "",
            "price": "2728.80"
        }
    ];

    // Generate the book list items from the array and add them to the page
    books.sort(function (a, b) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
    });
    refreshBookList(books);

    $("#genre").change(function () {
        var sortedBooks = sortBooks(books);
        refreshBookList(sortedBooks);
    })

    $("#price").on("slidestop", function () {
        var sortedBooks = sortBooks(books);
        console.log(sortedBooks);
        refreshBookList(sortedBooks);
    })

});