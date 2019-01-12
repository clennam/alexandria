function loadEventFromStorage() {
    event = JSON.parse(sessionStorage.getItem('loadedEvent'));
    $("#eventImg").attr("src", event.img);
    $("#eventName").text(event.name);
    $("#eventDate").text(event.date);
    $("#eventLocation").text(event.location);
    $("#eventDescription").text(event.description);
}

function calculate() {
    event = JSON.parse(sessionStorage.getItem('loadedEvent'));
    $("#errorPopup").popup();
    var ticketQty = parseInt($("#bookingQty").val()); var tokenQty = parseInt($("#bookingTokens").val());

    if (isNaN(ticketQty) || ticketQty < 1) {
        $("#errorPopup p").text('Please fill in a valid number of tickets.');
        $("#errorPopup").popup("open");
        $("#ticketPrice, #ticketQty, #tokensRedeemed, #ticketDiscount, #ticketPriceFinal").text('');
    } else {
        if (isNaN(tokenQty)) {
            tokenQty = 0;
        }
        if (tokenQty > sessionStorage.getItem('tokens')) {
            $("#errorPopup p").text('Sorry, you don\'t have that many tokens (Current Tokens = ' + sessionStorage.getItem('tokens') + ').');
            $("#errorPopup").popup("open");
            $("#ticketPrice, #ticketQty, #tokensRedeemed, #ticketDiscount, #ticketPriceFinal").text('');
            return;
        }
        if (tokenQty < 0) {
            $("#errorPopup p").text('Please enter a valid number of tokens.');
            $("#errorPopup").popup("open");
            $("#ticketPrice, #ticketQty, #tokensRedeemed, #ticketDiscount, #ticketPriceFinal").text('');
            return;
        }
        var ticketPrice = event.price;
        var finalPrice = (event.price * ticketQty) - tokenQty;
        $("#ticketPrice").text(ticketPrice);
        $("#ticketQty").text(ticketQty);
        $("#tokensRedeemed").text(tokenQty);
        $("#ticketDiscount").text(tokenQty);
        $("#ticketPriceFinal").text(finalPrice);
    }
}

function goToPayment() {
    if ($("#ticketPriceFinal").text() == "") {
        $("#errorPopup").popup();
        $("#errorPopup p").text('Please complete your order before proceeding to checkout.');
        $("#errorPopup").popup("open");
    } else {
        var order = {
            ticketPrice: $("#ticketPrice").text(),
            ticketQty: $("#ticketQty").text(),
            tokensRedeemed: $("tokensRedeemed").text(),
            ticketDiscount: $("ticketDiscount").text(),
            ticketPriceFinal: $("ticketPriceFinal").text()
        }
        sessionStorage.setItem('order', JSON.stringify(order));
        window.location.replace('payment_details.html');
    }
}

$(function () {
    if (sessionStorage.getItem('loadedEvent')) {
        loadEventFromStorage();
    }
});