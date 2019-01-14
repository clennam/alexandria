var stripe = Stripe('pk_test_4igOTjtQxqsoqiX5D3iIVWCN');
var elements = stripe.elements();

$(function () {
    var style = {
        base: {
            fontSize: '20px',
            color: "#000"
        }
    };
    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    card.addEventListener('change', function (event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Create a token or display an error when the form is submitted.
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the customer that there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                //Once the Stripe Verification is completed, call the function to the other fields' verifications.
                verifyForm();
            }
        });
    });
});

function verifyForm() {
    var requiredFields = ["Address1", "Address2", "City", "State", "ZIPCode", "Country"];
    error = false;
    requiredFields.forEach(function (field) {
        if (error == false) {
            if (document.forms["paymentDetails"]["payment" + field].value == "") {
                error = true;
                $("#formInvalidPopup").popup();
                $("#formInvalidPopup").popup("open");
            }
        }
    });
    if (!error) {
        makePayment();
    }
}

function makePayment() {
    var booking = {
        eventName: JSON.parse(sessionStorage.getItem('loadedEvent')).name,
        ticketQty: JSON.parse(sessionStorage.getItem('order')).ticketQty
    }
    var bookings;
    if ((sessionStorage.getItem('bookings') == "") || (sessionStorage.getItem('bookings') == "undefined")) {
        bookings = [booking];
    } else {
        bookings = JSON.parse(sessionStorage.getItem('bookings'));
        bookings.push(booking);
    }
    var user_id;
    JsonServer.get("users?email=" + sessionStorage.getItem('email'), function (data, status) {
        console.log("users?email=" + sessionStorage.getItem('email'));
        console.log(data);
        console.log(status);
        if (status === "success") {
            if (data.length === 1) {
                user_id = data[0].id;
            }
        }
        var user = {
            "firstName": sessionStorage.getItem('firstName'),
            "lastName": sessionStorage.getItem('lastName'),
            "email": sessionStorage.getItem('email'),
            "tokens": sessionStorage.getItem('tokens') - JSON.parse(sessionStorage.getItem('order')).tokensRedeemed,
            "favourites": sessionStorage.getItem('favourites'),
            "bookings": JSON.stringify(bookings),
            "password": data[0].password
        }
        console.log(user.tokens);
        console.log(user.bookings);
        JsonServer.put("users/" + user_id, user, function (requestData, requestStatus) {
            if (requestStatus != "success") {
                $('#formInvalidPopup p').html('There was an error with your transaction, please try again.');
                $('#formInvalidPopup').popup();
                $('#formInvalidPopup').popup('open');
            } else {
                sessionStorage.setItem("tokens", user.tokens);
                sessionStorage.setItem("bookings", user.bookings);
                window.location.replace('payment_success.html');
            }
        });
    });
}