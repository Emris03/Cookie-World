const discord = require ('discord.js');

var client = new discord.Client();

const auth = require('./auth.json');



const fs = require("fs");
client.msgs = require ("./msgs.json");

client.on ("ready", () => {
    console.log ("ready!");
    client.user.setGame ("Hello!");
});

const prefix = "a!";
client.on ("message", (message) => {

    if (message.content.startsWith ("write")) {
        editedmessage = message.content.slice (6);

        client.msgs [message.author.usernam] = {
            message: message.content
        }
        fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
            if(err) throw err;
            message.channel.send ("Message written!");
        });
    }

    if (message.author.bot) return;

    if (message.content.startsWith (prefix + "hello")) {
        message.reply ("Hi!");
        message.channel.send ("Hello there!");

        message.channel.send ("message: " + message);
        message.channel.send ("message sender: " + message.author.username);
        message.channel.send ("message sender  ID" + message.author.id);
    }
    if (message.content.startsWith (prefix + "loop")) {
        message.channel.send ("You encounter a box... do you open it? (y/n)");
        client.on ("message", (message) => {
            if (message.author.bot) return;
            if (message.content.startsWith ("y")) {
                message.channel.send ("It's filled with candy!");
                return;
            }
            if (message.content.startsWith ("n")) {
                message.channel.send ("What a shame... your loss!");
                return;
            }
        })
    }

// Choose emoji to send and do "\(select emoji" in a channel. Select and copy the message it sends and paste in the "if starts with."
    if (message.content.startsWith ("🍪")) {
        message.channel.send (":cookie:");
    }
    //if (message.content.startsWith ("😂")) {
    //    let emojicounter = client.msgs["counter"].lolEmoji;
    //    client.msgs ["counter"] = {
    //        lolEmoji: emojicounter + 1
    //    }
    //    fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
    //        if (err) throw err;
    //        message.channel.send ("Emoji counted");
    //    });
    //}
    //if (msg.startsWith ("get")) {
    //   let _message =  client.msgs[message.author.username].message;
    //   message.channel.send ("Message is : " + _message);
    //    let lolEmojiCount = client.msgs["counter"].lolEmoji;
    //}

    if (message.content.startsWith (prefix + "maze")) {
        message.channel.send ({files:["./images/blankmaze.gif"]});
    }

});

client.login (auth.token);
