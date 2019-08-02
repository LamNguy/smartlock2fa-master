function onAccount(e) {
    let idName = e.id;
    let name = idName.substring(0, idName.indexOf("-"));
    let type = "";
    if (idName.substring(idName.indexOf("-")+1, idName.indexOf("+")) === "deactivated") {
        type = "activate";
        $.ajax({
            method: "post",
            datatype: "json",
            url: '/manage',
            data: {
                name: name,
                type: type
            },
            success: function(data) {
                console.log(data);
                //window.location.reload();
            }
        });
    }    
}

function offAccount(e) {
    let idName = e.id;
    let name = idName.substring(0, idName.indexOf("-"));
    let type = "";
    if (idName.substring(idName.indexOf("-")+1, idName.indexOf("+")) === "activated") {
        type = "deactivate";
        $.ajax({
            method: "post",
            datatype: "json",
            url: '/manage',
            data: {
                name: name,
                type: type
            },
            success: function(data) {
                console.log(data);
                //window.location.reload();
            }
        });
    }    
}

function Delete(e) {
    let strName = e.id;
    let n = strName.indexOf("-");
    let username = strName.substring(n+1, strName.length);
    console.log(e);
    console.log($('#'+strName).closest('tr')); 
    $('#'+strName).closest('tr').remove();
    $.ajax({
        method: "post",
        datatype: "json",
        url: '/manage',
        data: {
            name: username,
            type: "delete"
        },
        success: function(data) {
            console.log(data);
            //window.location.reload();
        }
    })
}


