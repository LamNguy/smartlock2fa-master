

exports.parse = function(error) {
    let message = error.message;
    let parsedMessage = null;
    switch (error.code) {
        case 11000:
            let substr1 = message.substring(message.indexOf("$")+1,message.length);
            path = substr1.substring(0 ,substr1.indexOf("_"));
            parsedMessage =  path + " existed.";
            break;
    
        default:
            break;
    }
    return parsedMessage;
}
