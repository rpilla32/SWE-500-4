// JavaScript Document
$(document).ready(function () {
        $('input[name="yourRadioButtonName"]').change(function () {
            if ($(this).val() == "A") {
                $("#DivA").show();
                $("#DivB").hide();
            }
            else {
                $("#DivA").hide();
                $("#DivB").show();
            }
        });
    });