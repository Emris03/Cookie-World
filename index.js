// Improved stuff goes here
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const token = "NzMzNjkwMTc4ODk5NjczMTI5.XxG0lA.1UsHd4OOeq8d9yoorwGoRKlvdqI"
const userData = require('./data/userData.json');
const prefix = "c!"
bot.on('ready', function (evt) {
    console.log(`Loggid in as ${client.user.tag}!`);
    client.user.setActivity('Cookie World!', { type: 'PLAYING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});
bot.on('message', message => {
    //When porting over from bot.js, use ctrl + /
    let cont = message.content;
    let user = message.author;
    let userID = message.userID;
    let channel = message.channel;
    let channelID = message.channelID;
    let evt = message.evt;
    let args = message.content.substring(prefix.length).split(" ");
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    if(message.author.bot) {
        return;
    };
    let items = JSON.parse(fs.readFileSync("./items.json", "utf8"));
        if(!item[message.author.id]){ item[message.author.id] = {
            "coins": 0,
            "inventory": {
                "cookies": 0,
                "tonks": 0,
                "ducttape": 0,
                "longarm": 0
            },
            "bank": 0
        }};
        let item = item[message.guild.id].items;
    if(message.content.startsWith(prefix + "trade")){
        if(item === "none"){
            return message.channel.send("You have no items to trade with.")
        };
        let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if(!wUser) return message.channel.send("Please mention a valid user");
        if(wUser.id === message.author.id) return message.channel.send("You can't trade with yourself.");
        message.channel.send(`${message.author.username} wants to trade with ${wUser.user.username}`)
    };
    if(message.content.startsWith(prefix + "buy")){
        message.channel.send("What would you like to buy? \n1 or 2")
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {max: 2, time: 40000}).then(collected => {
            if(collected.first().content === ("1")){
                message.channel.send("1 bought.")
                item[message.guild.id] = {item: 1};
                fs.writeFile("./items.json", JSON.stringify(item), (err) => {if(err) console.log(err)});
            } else if(collected.first().content === ("2")){
                message.channel.send("2 bought.")
                item[message.guild.id] = {item: 2};
                fs.writeFile("./items.json", JSON.stringify(item), (err) => {if(err) console.log(err)});
            } else {
                message.channel.send("Please mention a valid item")
            }
        });
    }
})

bot.login(token);