function verifyForm() {
    const requiredFields = ["FirstName", "LastName", "CardNumber", "CVV", "ExpyDate", "Address1", "Address2", "City", "State", "ZIPCode", "Country"];
    error = false;
    requiredFields.forEach(function (field) {
        if (error == false) {
            if (document.forms["paymentDetails"]["payment" + field].value == "") {
                console.log("payment" + field);
                error = true;
                $("#formInvalidPopup").popup();
                $("#formInvalidPopup").popup("open");
            }
        }
    });
    if (!error) { window.location.replace('payment_success.html'); }
}

$(function () {

    $("#submitDetails").click(function () {
        verifyForm();
    });
});