function loadPanels() {
    $("#external_header").load("../assets/iphone/html/header.html", function () {
        $("#external_navbar").load("../assets/iphone/html/navbar.html", function () {
            $("#external_footer").load("../assets/iphone/html/footer.html", function () {
                $("[data-role='header'], [data-role='footer']").toolbar();
                $("[data-role='panel']").enhanceWithin().panel();
                $(window).orientationchange();
            });
        });
    });
}

function userClick() {
    var sessionFirstName = sessionStorage.getItem('firstName');
    var sessionLastName = sessionStorage.getItem('lastName');
    var sessionEmail = sessionStorage.getItem('email');
    var sessionTokens = sessionStorage.getItem('tokens');
    if (sessionFirstName && sessionLastName && sessionEmail && sessionTokens) {
        window.location.replace('account.html');
    } else {
        window.location.replace('signin.html');
    }
}

$(function () { loadPanels(); });