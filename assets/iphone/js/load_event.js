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
            $("#eventlist").append('<li onclick="loadEvent(' + eventNo + ')"><a href="#event" data-transition="slide"><img src="' + event.img + '" /><h2>' + event.name + '</h2><p><span>' + event.date + '</span> | <span>' + event.location + '</span></p></a></li>');
        });
        // refresh listview, this is important as it adds css to our new eventlist, do this one before last
        $("#eventlist").listview("refresh");

    }
}

function loadEvent(eventNo) {
    event = events[eventNo];
    $("#eventImg").attr("src", event.img);
    $("#title, #eventName").text(event.name);
    $("#eventDate").text(event.date);
    $("#eventLocation").text(event.location);
    $("#eventDescription").text(event.description);
    sessionStorage.setItem('loadedEvent', JSON.stringify(event));
}
function loadEventFromStorage() {
    event = JSON.parse(sessionStorage.getItem('loadedEvent'));
    $("#eventImg").attr("src", event.img);
    $("#title, #eventName").text(event.name);
    $("#eventDate").text(event.date);
    $("#eventLocation").text(event.location);
    $("#eventDescription").text(event.description);
}

$(function () {

    events = [
        {
            img: "../assets/common/images/bookclub.jpeg",
            name: "Christmas Book Club",
            date: "16th December",
            location: "British Council",
            price: "10",
            description: "Welcome to introvert happy hour! Looking for a great book club read to round out your year, or some great friends to celebrate Christmas with? Drop by the next Christmas Book Club meeting, and you just might find both!"
        },
        {
            img: "../assets/common/images/bookclub.jpeg",
            name: "Colombo Comic Expo",
            date: "13th November",
            location: "SLECC",
            price: "60",
            description: "Colombo Comic Expo - the ultimate gathering of comic book fans, cosplayers, artists and gamers from across Sri Lanka!"
        }
    ];
    refreshEventList(events);

    if (sessionStorage.getItem('loadedEvent'))
        loadEventFromStorage();

});