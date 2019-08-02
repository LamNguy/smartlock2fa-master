const find = require('find-process');
const {
    exec
} = require("child_process");

exports.triggerUnlockSignal = function triggerUnlockSignal(fullname) {
    find('name', 'myclient')
        .then(function (list) {
            if (list.length === 0) {
                spawnNewSocketClientProcess();

                //wait few seconds for the new socketclient proccess to start.
                setTimeout(triggerUnlockSignal, 5000);
            } else {
                for (let i = 0; i < list.length; i++) {
                    // var child = exec("kill -SIGUSR2 " + list[i].pid, {
                    //     shell: "/usr/bin/fish"
                    // }, (err, stdout, stderr) => {
                    //     if (err)
                    //         console.log(err);
                    //     else
                    //         console.log("kill -SIGUSR2 %s", list[i].pid);

                    // });
                    // child.unref();
                    process.kill(list[i].pid, 'SIGUSR2');
                }
            }
        });
}


function spawnNewSocketClientProcess() {
    var child = exec("node " + __dirname + "/socketClient.js", (err, stdout, stderr) => {
        console.log(__dirname);
        if (err) console.log("Error spawn a new socketClient processs" + err);
        else
            console.log("Spawned a new socketClient process");

    })
    console.log("spawned a new proc")
    child.unref();
}


// module.exports = triggerUnlockSignal;

//TODO: [Deploy]replace shell command for child proc when deploy
