//goes before client.onmessage
var xPos = 2
var yPos = 1
var mazeActive = 0

//Goes after client.onMessage
if (mazeActive == 1) {
    if (message.author.id == "723979592024719370") {
        channel.messages.fetch({ limit: 1 }).then(messages => {
            MazeMessage = message.id;
            //let channelID = message.channelID
            //message.channel.send(MazeMessage)})
        mazeActive = 0
    })}
};
//Goes inside a switch
//Maze commands:
            //==============================================================================================================================
            /*case 'displayx':
                channel.send(xPos)
                break;
            case 'displayy':
                channel.send(yPos)
                break;
            case 'addx':
                xPos+=1
                channel.send("X value added!")
                break;
            case 'removex':
                xPos-=1
                channel.send("X value removed!")
                break;
            case 'addy':
                yPos+=1
                channel.send("Y value added!")
                break;
            case 'removey':
                yPos-=1
                channel.send("Y value removed!")
                break;
            case 'sety' :
                ySet = message.content.slice(7)
                yPos = ySet
                channel.send ("Y valuse set!")
                break;
            case 'setx' : {
                xSet = message.content.slice(7)
                xPos = xSet
                channel.send ("X value set!")
                break;
            }
            //case 'maze2':
            case 'resetmaze':
                xPos = 2
                yPos = 1
                channel.send("Maze reset!")
                break;

            /*case 'maze':
                mazeGame(message)
                mazeComplete = false
                break;*/
            //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  NEWER MAZE COMMANDS ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
            /*case 'maze':
                mazeGame(message, args);
                mazeActive = 1
                break;

            case 'up':
                moveUp(message)
                break;
            case 'down':
                moveDown(message)
                break;
            case 'left':
                moveLeft(message)
                break;
            case 'right':
                moveRight(message)
                break;
            */ //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


//Maze functions


//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;  Other Maze Functions  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

/*
function sendLocation(message) {
    message.channel.send(new Discord.MessageAttachment("./images/mazes/0/" + (xPos - 1 + (yPos - 1) * 5) + ".png"))
    message.channel.send("Type '"+PREFIX+"Up', '"+PREFIX+"down', '"+PREFIX+"left', and '"+PREFIX+"right' to move around. Type '"+PREFIX+"resetmaze' to reset the maze.")
}
function cantMove(message) {
    message.channel.send("You can't go that way!")
    sendLocation(message)
}
function canMoveLeft(message) {
    xPos-=1
    sendLocation(message)
}
function canMoveRight(message) {
    xPos+=1
    sendLocation(message)

}
function canMoveUp(message) {
    yPos+=1
    sendLocation(message)

}
function canMoveDown(message) {
    yPos-=1
    sendLocation(message)

}
function moveLeft(message) {
    if (xPos == 1) {
        cantMove(message)

    }
    else if (((xPos == 2) && (yPos == 1)) 
        || ((xPos == 2) && (yPos == 4)) 
        || ((xPos == 4) && (yPos == 1)) 
        || ((xPos == 4) && (yPos == 2)) 
        || ((xPos == 5) && (yPos == 1)) 
        || ((xPos == 5) && (yPos == 5))) {
        cantMove(message)
    }
//    else if ((xPos == 2) && (yPos == 1)) {
//        cantMove(message)
//
//    }
//    else if ((xPos == 2) && (yPos == 4)) {
//        cantMove(message)
//    }
    else {
        canMoveLeft(message)

    }


}
function moveRight(message) {
    if (xPos == 5) {
        cantMove(message)
    }
    else if (((xPos == 1) && (yPos == 1)) 
        || ((xPos == 1) && (yPos == 4)) 
        || ((xPos == 3) && (yPos == 1)) 
        || ((xPos == 3) && (yPos == 2)) 
        || ((xPos == 4) && (yPos == 1)) 
        || ((xPos == 4) && (yPos == 5))) {
        cantMove(message)
    }
    else {
        canMoveRight(message)
    }

}
function moveUp(message) {
    if (((xPos > 0) && (xPos < 4) && (yPos == 5)) || ((yPos == 5) && (xPos == 5))) {
        cantMove(message)
    }
    else if (((xPos==2)&&(yPos==1))
        ||((xPos==2)&&(yPos==2))
        ||((xPos==2)&&(yPos==4))
        ||((xPos==3)&&(yPos==2))
        ||((xPos==3)&&(yPos==3))
        ||((xPos==3)&&(yPos==4))
        ||((xPos==4)&&(yPos==3))
        ||((xPos==4)&&(yPos==4))
        ||((xPos==5)&&(yPos==2))
        ||((xPos==5)&&(yPos==3))) {
        cantMove(message)
    }
    else if ((xPos==4)&&(yPos==5)) {
        message.channel.send ("You did it! You finished the maze!")
        message.channel.send (new Discord.MessageAttachment("./images/randomimages/congrats.jpg"))
        mazeComplete = true
        xPos = 2
        yPos = 1
    }
    else {
        canMoveUp(message)
    }
}
function moveDown(message) {
    if (yPos == 1) {
        cantMove(message)
    }
    else if (((xPos==2)&&(yPos==2))
        ||((xPos==2)&&(yPos==3))
        ||((xPos==2)&&(yPos==5))
        ||((xPos==3)&&(yPos==3))
        ||((xPos==3)&&(yPos==4))
        ||((xPos==3)&&(yPos==5))
        ||((xPos==4)&&(yPos==4))
        ||((xPos==4)&&(yPos==5))
        ||((xPos==5)&&(yPos==3))
        ||((xPos==5)&&(yPos==4))) {

    }
    else {
        canMoveDown(message)
    }

}
function mazeGame(message, args) {

    ensureUserInDB(message.author);

    message.channel.send(mazeController(message.author.id, args));

}*/