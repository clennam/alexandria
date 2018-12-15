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
    if (device == "iPhone") location.href = "./iphone/index.html";
    if (device == "iPad") location.href = "./ipad/index.html";
});