//=============================log management=============================

function toggle(el) {
  console.log(el.id);
  let contentId = `${el.parentNode.id}-content`;
  let content = document.getElementById(contentId);

  if (content.getAttribute("data-loaded") === "false") {
    $.ajax({
      method: "get",
      datatype: "json",
      // processDataBoolean: false,
      url: `/logs/content`,
      data: {
        logId: `${el.parentNode.id}`
      },
      success: function(data) {
        if (data.err) {
          console.log(data.err);
        } else {
          console.log(data.url);

          //=======================cors proxy===========================
          $.ajaxPrefilter(function(options) {
            if (options.crossDomain && jQuery.support.cors) {
              var http =
                window.location.protocol === "http:" ? "http:" : "https:";
              options.url =
                http + "//cors-anywhere.herokuapp.com/" + options.url;
              //options.url = "http://cors.corsproxy.io/url=" + options.url;
            }
          });

          $.ajax({
            url: data.url,
            async: false,
            success: function(response) {
              content.innerText = response;
            }
          });
        }
      }
    });
    console.log("loading");
    content.setAttribute("data-loaded", "true");
  } else {
    console.log("loaded");
  }

  content.hidden = !content.hidden;
}

function filterLog() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("mngt-logs-list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

//=============dialog change password===========
$(document).ready(function(){
  $("#changePassword").click(function(){
      $("#passwordModal").modal();
  });
});

//=============dialog upload image==============
$(document).ready(function(){
  $("#uploadImage").click(function(){
      $("#imageModal").modal();
  });
});