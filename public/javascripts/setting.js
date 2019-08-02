//================Change password=======================
let oldpwd = document.getElementById("oldpass");
let newpwd = document.getElementById("newpass");
let newpwdconfirm = document.getElementById("renewpass");
let msg1 = document.createElement("div");
msg1.id = "notify-pass";
msg1.style.display = "none";
newpwdconfirm.parentNode.insertBefore(msg1, newpwdconfirm);


let saveChangeBtn = document.getElementById("saveChange");
saveChangeBtn.disabled = true;

$(document).on('input', '#newpass,#renewpass', function () {
    if (newpass.value !== renewpass.value) {
        msg1.textContent =
            "Not match";
        msg1.className = "error";
        msg1.style.display = "block";
        saveChangeBtn.disabled = true;
    } else {
        msg1.style.display = "none";
        saveChangeBtn.disabled = false;
    }
});

//==============Upload image=============================
let valid = true;
let msg2 = document.createElement("div");
msg2.id = "notify-image";
msg2.style.display = "none";
let pattern = new RegExp("^[A-Za-z]+-[0-9]+\.(jpg|jpeg|png)$", "i");
let uploadBtn = document.getElementById("upload");
uploadBtn.disabled = true;
uploadBtn.parentNode.insertBefore(msg2, uploadBtn);
$(document).ready(function () {
    function updateBtn(valid) {
        if (valid) {
            msg2.style.display = "none";
            uploadBtn.disabled = false;
        } else {
            msg2.textContent = "File name is invalid";
            msg2.className = "error";
            msg2.style.display = "block";
            uploadBtn.disabled = true;
        }
    }

    function checkFileName() {
        let inputObj = $('input[type="file"]');
        console.log(inputObj);
        console.log(typeof inputObj);
        console.log(inputObj.length);
        for (let i = 0; i < inputObj.length; i++) {
            if (inputObj[i].files.length !== 0) {
                let fileName = inputObj[i].files[0].name;
                console.log(fileName);
                if (!pattern.test(fileName)) {
                    return false;
                }
            }
        }
        return true;
    }

    $('input[type="file"]').change(function (e) {
        valid = checkFileName();
        updateBtn(valid);
    });

    $(".addBtn").on("click", function () {
        let newNode = '<div class="form-group">' +
            '<div class="row">' +
            '<div class="col-md-10">' +
            '<input type="file" class="file" name="photo" accept="image/*" required>' +
            '</div><div class="col-md-2">' +
            '<span class="glyphicon glyphicon-minus-sign del"></span></div></div></div>';
        $(".addBtn").closest(".form-group").before(newNode);
        console.log($('input[type="file"]'));
        $(".del").on("click", function () {
            this.closest(".form-group").remove();
            valid = checkFileName();
            updateBtn(valid);
        });
    });

    $(".del").on("click", function () {
        this.closest(".form-group").remove();
        valid = checkFileName();
        updateBtn(valid);
    });
});