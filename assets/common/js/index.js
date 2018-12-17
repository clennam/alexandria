var device;
if (new RegExp("iPhone").test(navigator.userAgent)) {
    device = "iPhone";
}
if (new RegExp("iPad").test(navigator.userAgent)) {
    device = "iPad";
}
console.log("You are using an " + device);
$(document).ready(function () {
    $("#device").append(device);
    if (device == "iPhone") location.href = "./iphone/home.html";
    if (device == "iPad") location.href = "./ipad/home.html";
});
