//=============================door unlock form===============================

let unlockBtn = $("#unlockBtn");
let unlockForm = $("#unlockForm");

unlockForm.submit(e => {
  e.preventDefault();
  $.ajax({
    method: "post",
    // datatype: 'json',
    // processDataBoolean: false,
    url: "/doorControl",
    // data: {
    //   'otpInput': otpInput.val()
    // },
    success: function(data) {
      if (typeof data.success === "undefined") {
        window.location.replace("/login");
      } else {
        $("#controlResMsg").html(
          "<a class='glyphicon glyphicon-info-sign' id='controlResMsg'></a> " +
            data.message
        );
      }
    }
  });
});