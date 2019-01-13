// Initial redirect rules for the site
var device = "iPad"; // default should be iPad as that is closest to PC
if (new RegExp("iPhone").test(navigator.userAgent) ||
    new RegExp("Android").test(navigator.userAgent)) {
    device = "iPhone";
}
if (new RegExp("iPad").test(navigator.userAgent)) {
    device = "iPad";
}
console.log("You are using an " + device);
$(document).ready(function () {
    $("#device").append(device);
    $("#device").css('color', 'green');
    $("#device").css('font-weight', 'bold');
    setTimeout(function () {
        if (device == "iPhone") location.href = "./iphone/home.html";
        if (device == "iPad") location.href = "./ipad/home.html";
    }, 1500);
});