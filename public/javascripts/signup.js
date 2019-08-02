//==============================sign up=================================
let passwd = document.getElementById("passwordSignUp");
let passwdConfirm = document.getElementById("passwdConfirmSignUp");
let signupForm = document.getElementById("signupForm");
let msg = document.createElement("div");
msg.id = "notify";
msg.style.display = "none";
passwdConfirm.parentNode.insertBefore(msg,passwdConfirm);

let signUpSubmitBtn = document.getElementById("signUpSubmitBtn");
signUpSubmitBtn.disabled = true;

$(document).on('input', '#passwdConfirmSignUp,#passwordSignUp', function(){
  if (passwd.value !== passwdConfirm.value) {
    msg.textContent =
      "Not match";
    msg.className = "error";
    msg.style.display = "block";
    signUpSubmitBtn.disabled = true;
  } else {
    msg.style.display = "none";
    signUpSubmitBtn.disabled = false;
  }
});