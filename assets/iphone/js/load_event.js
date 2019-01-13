events = [{}];

function refreshEventList(events) {
    // clear book list
    $("#eventlist").html('');
    // if the array passed is not null or empty
    if (events) {
        // initialise listview (this is important, do this first to avoid lifecycle troubles)
        $("#eventlist").listview();
        //for each element in the array
        events.forEach(function (event, eventNo) {
            // Just insert raw html and add the necessary text in the appropriate places to the eventlist listview div to make this actual html
            $("#eventlist").append('<li onclick="loadEvent(' + eventNo + ')"><a href="#event" data-transition="slide"><img src="' + event.image + '" /><h2>' + event.name + '</h2><p><span>' + event.date + '</span> | <span>' + event.location + '</span></p></a></li>');
        });
        // refresh listview, this is important as it adds css to our new eventlist, do this one before last
        $("#eventlist").listview("refresh");

    }
}

function loadEvent(eventNo) {
    eventId = eventNo + 1;
    event = events[eventNo];
    $("#eventImg").attr("src", event.image);
    $("#title, #eventName").text(event.name);
    $("#eventDate").text(event.date);
    $("#eventLocation").text(event.location);
    $("#eventDescription").text(event.description);
    sessionStorage.setItem('loadedEvent', JSON.stringify(event));

    var favourites = JSON.parse(sessionStorage.getItem('favourites'));
    if (favourites) {
        if (favourites.events.indexOf(eventId) !== -1) {
            $('#favouritesButton').html('Remove From Favourites');
        } else {
            $('#favouritesButton').html('Add To Favourites');
        }
    } else {
        $('#favouritesButton').html('Add To Favourites');
    }
}
function loadEventFromStorage() {
    event = JSON.parse(sessionStorage.getItem('loadedEvent'));
    $("#eventImg").attr("src", event.image);
    $("#title, #eventName").text(event.name);
    $("#eventDate").text(event.date);
    $("#eventLocation").text(event.location);
    $("#eventDescription").text(event.description);
}

$(function () {
    JsonServer.get('events', function (data, status) {
        if (status == 'success') {
            events = data;
            refreshEventList(events);
            if (sessionStorage.getItem('loadedEvent')) {
                loadEventFromStorage();
            }
        } else {
            console.error('Internal Server Error, GET Request Failed');
        }
    });

    var eventAttending;
    $("[data-role='controlgroup']").on("change", function () {
        if (eventAttending != undefined) {
            switch (eventAttending) {
                case 'yes':
                    $("#tabYes ul li:last-child").remove();
                    break;

                case 'no':
                    $("#tabNo ul li:last-child").remove();
                    break;

                case 'maybe':
                    $("#tabMaybe ul li:last-child").remove();
                    break;

                default:
                    break;
            }
            eventAttending = undefined;
        }
        if (eventAttending == undefined) {
            var radiobtns = $("input", this)
            radiobtns.each(function () {
                if ($(this).is(":checked")) {
                    eventAttending = $(this).val();
                }
            });
            switch (eventAttending) {
                case 'yes':
                    $("#tabYes ul").append("<li><h2>" + sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName') + "</h2></li>")
                    $("#tabYes ul").listview(); $("#tabYes ul").listview("refresh");
                    break;

                case 'no':
                    $("#tabNo ul").append("<li><h2>" + sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName') + "</h2></li>")
                    $("#tabNo ul").listview(); $("#tabNo ul").listview("refresh");
                    break;

                case 'maybe':
                    $("#tabMaybe ul").append("<li><h2>" + sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName') + "</h2></li>")
                    $("#tabMaybe ul").listview(); $("#tabMaybe ul").listview("refresh");
                    break;

                default:
                    break;
            }
        }
    });
});

var eventId = 0;
function addToFavourites() {
    var favourites = JSON.parse(sessionStorage.getItem('favourites'));
    if (favourites) {
        if (favourites.events.indexOf(eventId) == -1) {
            favourites.events.push(eventId);
        } else {
            favourites.events.splice(favourites.events.indexOf(eventId), 1);
        }

        var firstName = sessionStorage.getItem('firstName');
        var lastName = sessionStorage.getItem('lastName');
        var email = sessionStorage.getItem('email');
        var tokens = sessionStorage.getItem('tokens');
        var bookings = sessionStorage.getItem('bookings');

        var values = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "tokens": tokens,
            "favourites": JSON.stringify(favourites),
            "bookings": bookings
        };

        JsonServer.get('users?email=' + email, function (data, status) {
            if (status == 'success') {
                var userId = data[0].id;
                values.password = data[0].password;
                JsonServer.put('users/' + userId, values, function (data, status) {
                    if (status == 'success') {
                        sessionStorage.setItem('favourites', JSON.stringify(favourites));
                        if ($('#favouritesButton').html() == 'Add To Favourites') {
                            $('#favouritesButton').html('Remove From Favourites');
                        } else {
                            $('#favouritesButton').html('Add To Favourites');
                        }
                    } else {
                        console.error('Internal Error Occurred, PUT Request Failed');
                    }
                });
            } else {
                console.error('Internal Error Occurred, GET Request Failed');
            }
        });
    } else {
        window.location.replace('signin.html');
    }
}