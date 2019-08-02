//==============================auth method=============================
$(document).ready(function () {
    let gmailBtn = $("#gmailBtn");
    let smsBtn = $("#smsBtn");
    let isActive = $(".warning-message").attr("id");

    if(isActive === 'false') {
        gmailBtn.prop('disabled', true);
        smsBtn.prop('disabled', true);
        $(".warning-message").show();
    } else {
        $(".warning-message").hide();
    }

    [gmailBtn, smsBtn].forEach(btn => {
        btn.click(e => {
            // alert("click");
            e.preventDefault();

            [gmailBtn, smsBtn].forEach(btn => {
                btn.prop("disabled", true);
            });

            let postUrl = e.target.getAttribute("id") === "smsBtn" ? "/sms" : "/gmail";
            console.log(postUrl);

            $.ajax({
                type: "post",
                url: postUrl,
                datatype: "json",
                success: function () {
                    window.location.href = "/submit";
                }
            });
        });
    });
})
