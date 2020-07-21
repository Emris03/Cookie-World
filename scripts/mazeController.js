const fs = require('fs');

var Maze = function(userID, args){
    let data = JSON.parse(fs.readFileSync("./data/users/userData.json", "utf8"));

    let numArgs = args.length;

    let currentMaze = -1;
    let triggers = {t1: false, t2: false};

    console.log(args[0].toLowerCase());

    if(numArgs >= 0) {
        switch (args[0].toLowerCase()) {
            case 0:
                currentMaze = 0;

                console.log(2.1);
                break;


            case 'start' :
                currentMaze = 0;
                triggers.t1 = true;

                console.log(2.2);
                break;
            case 'reset' :
                console.log(2.3);

                return reset(userID, data);
                break;
            default:
                console.log(2.4);
        }
    }

    let saveData = {

    };

    data[userID].otherStuff.mazeData = {

    }
}


function move() {

}

function reset(userID, data) {
    console.log(3.1);

    if(Object.keys(data[userID].otherStuff.mazeData).length != 0) {
        console.log(3.2);

        let mazeIDInProgess = [];
        for (let k in Object.keys(data[userID].otherStuff.mazeData)) {
            let d = data[userID].otherStuff.mazeData[k];
            if(d.progress.move != -1) {
                mazeIDInProgess.push(k);
            }
        }

        console.log(3.3);

        switch (mazeIDInProgess.length) {
            case 0:
                return "All mazes have been finished!";
                break;
            case 1:
                return "Maze " + mazeIDInProgess[0] + " has been reset!";
            default:
                let s = "Multiple mazes are in progess (";
                mazeIDInProgess.forEach(ele => {
                    s += ele + ", ";
                });
                s.substring(0,s.length-2);

                console.log(3.4);
                return s + ")!";
        }
    } else {
        console.log(3.5);
        return "No mazes have been started!";
    }
}


module.exports = Maze;

/*

"mazeData" : {
    mazeID : {
        "progress" : {
            "tile" : -1,
            "move" : -1
    },
        "records" : {
            "timesCompleted" : 0,
            "leastMoves" : -1
    }

}
}













*/
