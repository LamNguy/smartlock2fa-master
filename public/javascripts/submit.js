//=============================otp submit form===============================

let submitBtn = $("#submitBtn");
let otpInput = $("#otpInput");
let otpSubmitForm = $("#otpSubmitForm");

otpSubmitForm.submit(e => {
  e.preventDefault();

  if (otpInput.valid()) {
    $.ajax({
      method: "post",
      datatype: "json",
      // processDataBoolean: false,
      url: "/submit",
      data: {
        otpInput: otpInput.val()
      },
      success: function(data) {
        if (typeof data.success !== "undefined") {
          console.log(data.message);
          if (data.success === false) {
            $("#submitResMsg").html(
              "<a class='glyphicon glyphicon-info-sign' id='otpResMsg'></a> " +
                data.message
            );
          } else {
            window.location.replace("/doorControl");
          }
        } else {
          window.location.replace("/login");
        }
      }
    });
  }
});