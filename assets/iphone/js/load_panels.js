$(function () {
    $("#external_header").load("../assets/iphone/html/header.html", function () {
        $("#external_navbar").load("../assets/iphone/html/navbar.html", function () {
            $("#external_footer").load("../assets/iphone/html/footer.html", function () {
                $("[data-role='header'], [data-role='footer']").toolbar();
                $("[data-role='panel']").enhanceWithin().panel();
            });
        });
    });
});
