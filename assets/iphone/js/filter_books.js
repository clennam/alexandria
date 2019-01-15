// function that controls loading of an array of objects into the booklist listview
function refreshBookList(books) {
    // clear book list
    $("#booklist").html('');
    // if the array passed is not null or empty
    if (books) {
        // initialise listview (this is important, do this first to avoid lifecycle troubles)
        $("#booklist").listview();
        //for each element in the array
        books.forEach(function (book) {
            // (capitalise the genre field so it looks better in the app, not important)
            book.genre = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
            // Just insert raw html and add the necessary text in the appropriate places to the booklist listview div to make this
            // actual html
            $("#booklist").append('<li onclick="listClick(' + book.id + ')"><a class="booklist-item" href="#book" data-transition="slide"><img src="' + book.image + '" /><h2>' + book.title + '</h2><p>' + book.author + ' | ' + book.genre + '</p><span class="ui-li-count">' + book.price + '</span></a></li>');
        });
        // refresh listview, this is important as it adds css to our new booklist, do this one before last
        $("#booklist").listview("refresh");

        // apply books list-specific css that has not already been added. Do this last, and after you refresh the listview css.
        $('.booklist-item > h2, p').css('width', '82%');
    }
}

// function that controls how books are reordered according to criteria
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
    JsonServer.get('books', function (data, status) {
        if (status == 'success') {
            var books = data;
            // Generate the book list items from the array, sort them in initial order, and add them to the page
            books.sort(function (a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            refreshBookList(books);

            // Reorder books when filters change
            $("#genre").change(function () {
                var sortedBooks = sortBooks(books);
                refreshBookList(sortedBooks);
            });

            $("#price").on("slidestop", function () {
                var sortedBooks = sortBooks(books);
                refreshBookList(sortedBooks);
            })
        } else {
            console.error('Internal Server Error, GET Request Failed');
        }
    });
});
