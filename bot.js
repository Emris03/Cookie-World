const Discord = require('discord.js');

const auth = require('./auth.json');
const client = new Discord.Client();
const fs = require('fs');

const coinData = require ('./data/users/coinData.json');
const fight = require ('./data/users/fight.json')
const test = require('./test.json')
const caravanData = require('./data/caravanActive.json')

const { isNullOrUndefined, isUndefined } = require('util');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');

const MAIN_PREFIX = "k!"
const COOKIE_PREFIX = "kc!"

client.on('ready', function (evt) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Cookie Land!', { type: 'PLAYING' })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

//Default Variable settings 
cookiePrice = 10
tonkPrice = 100
tapePrice = 50
armPrice = 50
numberOfFights = 0

client.on("guildMemberAdd", member => {
    /*var role = member.guild.roles.find ("name", "Outsiders");
    member.addRole (role);
    ensureUserInDB(member);*/
});

client.on("guildMemberRemove", member => {
    //message.channel.send("We'll miss you! Oh wait... you can't see this...");
})

client.on('message', message => {
    let cont = message.content;
    let user = message.author;
    let userID = message.userID;
    let channel = message.channel;
    let channelID = message.channelID;
    let evt = message.evt;
    if(message.author.bot) {
        return;
    };

    //numberOfWords = message.content.split(' ')
    //numberOfCoins = parseInt(numberOfWords.length)
    buyItem(message, ["coin", auth.token, Math.round(Math.random() * 3 + 0.7)]);

    //caravan chance
    if ((!caravanData[message.channel.id])||(caravanData[message.channel.id].active==0)){
        caraChance = Math.random() * 100
        if (caraChance > 95) {
            var caraChance = 0;
            caravanData[message.channel.id] = {
                active: 1
            }
            fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
                if (err) throw err;
            });
            caraVan(message);
        };
    };

    //Only so it wont require a prefix
    if (message.content.startsWith("rip")) {
        message.channel.send(new Discord.MessageAttachment("./images/randomimages/tombstone.jpg"));
    };

try{

    if (cont.substring(0, MAIN_PREFIX.length).toLowerCase() == MAIN_PREFIX) {
        var args = cont.substring(MAIN_PREFIX.length).split(' ');
        var cmd = args.shift();


        switch(cmd) {//all commands that start with the main prefix, in this case, "k!"
            // !ping
            case 'ping':
                message.channel.send("Pinging ...")
			    .then((msg) => {
				msg.edit(`Ping: ${msg.createdTimestamp - Date.now()}ms`)
			});
                break;

            case 'avi':
                channel.send(user.displayAvatarURL());
            break;
            case 'rip':
                let att = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
                channel.send(att);
            break;
            case 'file':
                let buffer = fs.readFileSync('./example.txt');
                let att2 = new Discord.MessageAttachment(buffer, 'example.txt');
                channel.send('here is file example', att2);
                break;
            case 'embed':
                const embed = new Discord.MessageEmbed ()
                .setAuthor('Emris')
                .setDescription('This is an embed')
                .setFooter('This was made in js')
                .addField('Hi there!')
                .setThumbnail('https://media.discordapp.net/attachments/726549559584751683/727189926986121246/blake.png')
                .setColor('#f5e042')
                channel.send(embed)
                break;
            case 'u':
                channel.send("this is a wip right now.");
                channel.send(dataStorage(message));
                break;
            case 'trainer':
                getAvitar(channel,args[0])
                break;
            case 'testChannel':
                makeChannel(message)
                break;

            case 'help':
                //Needs an update
                channel.send("Here are some commands I have: \n w!help (brings up the wanderer help menu)\n a!delete <number> (deletes a number of messages) \n a!maze (allows you to play a maze game) \n a!spam <mention> <number> (mentions a given person a set number of times, still under construction) \n a!8ball <question> (a magic 8ball tells you your fate) \n a!ping (check the speed at which the bot responds)")
                break;

            case 'delete':
                let numberDelete = message.content.split(" ").slice(1).join(" ")
                if (numberDelete < 101) {
                    message.channel.bulkDelete(numberDelete)
                }
                if (numberDelete > 100) {
                    channel.send ("That's too much! Try a lesser number...")
                }
                break;
            case 'say'://if you add a || to a test, its basically saying "Or". 
                if (message.author.id === "380364910078459905" || "627852058845904927"){
                    sayMessage = message.content.slice(6)
                    channel.send(sayMessage)
                    message.delete()
                    break;
                }
                else{message.channel.send("You don't have permission to use this command!") 
                    break;}

                //edit message by id
            case 'editmessage':
                channel.send("Ima edit this")
                messageID = message.guild.me.find.messageID()
                message.channel.messages.fetch({around: messageID, limit: 1})
                    .then(msg => {
                const fetchedMsg = msg.first();
                fetchedMsg.edit("Lol");
                })
                break;

            case 'getmention'://sends a dm
                mention = message.mentions.users.first()
                if (mention == null) {return;}
                //message.delete()
                mentionMessage = message.content.slice(12)
                mention.send (mentionMessage)
                channel.send (`Done!${mention}has been messaged!`)
                break;
            case 'spam':
                if (message.author.id === "627852058845904927"|| message.author.id ==="380364910078459905"){
                    mention = message.mentions.users.first()
                    if (mention == null) {return;}
                    mentionMessage = message.content.slice(6)
                    let numberSpam = message.content.split(" ").slice(2).join(" ")
                    if (numberSpam > 100) {
                       channel.send("That's too much spam! Please choose a lesser number...")
                    }
                    if (numberSpam < 101) {
                        for (var i = 0; i < numberSpam; i++) {
                            spamMessage(message)
                        }
                    }
                    break;
                }
                else{channel.send("You dont have permission to use this command!")
                    break;}

            case '8ball':
                var random = Math.floor (Math.random() * (9))
                channel.send(new Discord.MessageAttachment("./images/randomimages/"+random+".jpg"))
                break;

            default:
                channel.send(`Command ${cont} not found. Type a!help for more options`);
                break;
            // Just add any case commands if you want to..
         }
     }
    if (cont.substring(0, COOKIE_PREFIX.length).toLowerCase() == COOKIE_PREFIX) {
        var args = cont.substring(COOKIE_PREFIX.length).toLowerCase().split(' ');
        var cmd = args.shift();
console.log(1);
    
        switch (cmd) {//these activate if the prefix used is the cookie prefix, in this case "kc!".
            case 'clear':
                client.clearTimeout(caraTime, 0)
                caravanData[message.channel.id].active=0
                fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
                    if (err) throw err;
                });
                message.channel.send("Timeout Cleared!")

            case 'bal':
                let _moneymessage = coinData[message.author.id].coins
                channel.send("You balance is currently: "+_moneymessage+" (coins earned from messages sent)")
                break;
            case 'shop':
                displayShop(message, cookiePrice, tonkPrice, tapePrice, armPrice)
                break;

            case 'inv':
                displayInv(message)
                break;
                
            case 'buy':
            console.log(2.1);
                buyItem(message, args);

                break;
            
            case 'raid':
                caraCheck(message)
                break;

            case 'heist':
                cookieHeist(message,args);
                break;
            case 'fight':
                cookieFight(message,args);
                break;
            case 'accept':
                acceptFight(message)
                break;
            case 'deny':
                denyFight(message)
                break;
            case 'bank':
                cookieBank(message,args);
                break;
            case 'withdraw':
                bankWithdraw(message,args);
                break;
            case 'deposit':
                bankDeposit(message,args/*.pop()*/);
                break;
            case 'cookie':
                if(Object.keys(args).length != 0){
                    if(args[0] == 'fight') {
                        cookieFight(message,args.pop());
                    } else if(args[0] == 'hiest') {
                        cookieFight(message,args.pop());
                    }
                }
                break;

            //this command is actually pretty useless
            case 'start':
            console.log(2.6);
                ensureUserInDB(user);
                welcome = new Discord.MessageEmbed ()
                    .setAuthor('WELCOME!')
                    .setDescription('<@'+message.author.id+'>, Welcome to Cookie Land! Use <'+COOKIE_PREFIX+'help> for info on how to play!')
                    .setImage('https://media.discordapp.net/attachments/726550648660688979/731121120497106984/2Q.png')
                    .setColor('#f5e042')
                channel.send(welcome)
                break;

            
            

        }


    }

 } catch (e) {
     console.log(e);
     catchErr(e, message);
 }
});

function caraTimer (message){
    //client.setTimeout(300000)
    caraTime = client.setTimeout(() => {
        if(caravanData[message.channel.id].active==1){
            caravanData[message.channel.id].active=0
            fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
                if (err) throw err;
            });
            message.channel.send("The caravan got away! Too bad :(")
        }
        else{
            
        }
    }, /*300000*/20000)
}

function caraCheck (message) {
    if((!caravanData[message.channel.id]) || (caravanData[message.channel.id].active==0)){
        message.channel.send("There are no caravans to be seen.")
    }
    else{
        caraVanRaid(message)
    }
}

function caraVan (message) {
    caraMessage = new Discord.MessageEmbed ()
            .setAuthor('COOKIE CARAVAN')
            .setFooter("You're the best cookie thief!")
            .setDescription('**A cookie caravan has appeared!**\n Quick! Use \"'+COOKIE_PREFIX+'raid\" to try and steal their coins before they get away!')
            .setImage("https://media.discordapp.net/attachments/726550648660688979/732272960257261718/caravan.jpg")
            .setColor('#f5e042')
    message.channel.send(caraMessage)
    caraTimer(message)
}

function caraVanRaid (message) {
    math1 = parseInt(Math.round(coinData[message.author.id].coins*1.25))
    caraCarry = parseInt(Math.round(Math.floor (Math.random() * (math1))))
    math2 = parseInt(Math.round(coinData[message.author.id].inventory.cookies*1.25))
    caraCookie = parseInt(Math.round(Math.floor (Math.random() * (math2))))
    challenger = parseInt(coinData [message.author.id].inventory.cookies)
    rn = Math.random() * 100
    winnerVar0 = parseInt(challenger + caraCookie)
    winnerVar = parseInt(challenger / winnerVar0 * 100)
    //message.channel.send(winnerVar.toFixed(3))
    if (winnerVar > rn) { //sender won
        sender = message.author.id
        caraMessageVictory = new Discord.MessageEmbed ()
            .setAuthor('COOKIE CARAVAN')
            .setFooter("You're the best cookie thief!")
            .setDescription('**<@'+message.author.id+'>\nYou have successfully raided the caravan!! You stole '+(Math.floor(caraCarry/2))+' coins from the caravan! :D**')
            .setColor('#f5e042')
        coins = parseInt(coinData [message.author.id].coins)
        coinData [message.author.id].coins = coins + (Math.floor(caraCarry/2))
        caravanData[message.channel.id].active=0
        fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
            if (err) throw err;
        });
        fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
            if (err) throw err;
        });
        message.channel.send(caraMessageVictory)
        client.clearTimeout(caraTime, 0)
        caravanData[message.channel.id].active=0
        fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
            if (err) throw err;
        });

    }
    if (winnerVar < rn){
        caraMessageLoss = new Discord.MessageEmbed ()
            .setAuthor('COOKIE CARAVAN')
            .setDescription('**<@'+message.author.id+'> the battle was brutal.. cookies crumbled...\nYou failed to raid the caravan and missed out on '+caraCarry+' coins from the caravan! D:**')
            .setColor('#f5e042')
        message.channel.send(caraMessageLoss)
        client.clearTimeout(caraTime, 0)
        caravanData[message.channel.id].active=0
        fs.writeFile ("./data/caravanActive.json", JSON.stringify(caravanData,null,4), err => {
            if (err) throw err;
        });
    }
}

function displayInv(message) {
                user = message.author.id
                cookieCount = coinData [message.author.id].inventory.cookies
                tonkCount = coinData [message.author.id].inventory.tonks
                tapeCount = coinData [message.author.id].inventory.ducttape
                ArmCount = coinData [message.author.id].inventory.longarm
                invMessage = new Discord.MessageEmbed ()
                    .setAuthor('Inventory')
                    .setDescription('<@'+user+'>')
                    .addField("**Cookies: **", cookieCount)
                    .addField("**Tonks: **", tonkCount)
                    .addField("**Duct Tape Rolls: **", tapeCount)
                    .addField("**Robotic Arms: **", ArmCount)
                    .setColor('#f5e042')
                message.channel.send(invMessage)
}

function displayShop(message, cookiePrice, tonkPrice, tapePrice, armPrice) {
    shopMessage = new Discord.MessageEmbed ()
        .setAuthor('Shop')
        .setDescription("Here is what we have for sale!")
        .addField("-Cookies: \"Just your average living cookie.. what?\" \nGet more cookies so you can have more than everyone else; \nThe person with the most cookies has a higher chance of winning heists and battles! \nPrice(in coins):",cookiePrice)
        .addField("-Tonks: \"Tonk you very much sir, for blowing up my enemies.\" \nTougher than 10 cookies, Tonks are the ultimate fighters. \nBe careful when saving for one, as your money will be left to steal! \nPrice(in coins):",tonkPrice)
        .addField("-Duct Tape Rolls: \"Broken robot part? DUCT TAPE! Scraped knee? DUCT TAPE!\" \nDuct-tape your coins to the gound, your coins will be harder to steal! \nDuct-tape is sticky, if an enemy beats you they could get more coins! \nPrice(in coins):",tapePrice)
        .addField("-Robotic Arms: \"Now I don't need my real flimsy squishy arms!\"*chop*\"OOWW-\" \nRobotic arms are better for stealing. \nRobotic arms increase your chances of pulling off a heist or winning a fight! \nPrice(in coins):",armPrice)
        .setColor('#f5e042')
        message.channel.send(shopMessage)
}
function purchaseItem(message, args, item) {
    console.log(3.0);
    ensureUserInDB(message.author);

    let allc = parseInt(coinData[message.author.id].coins);
    let inum = coinData[message.author.id].inventory[item.dn];
    let num = 1;
    if(Object.keys(args).length !== 0) {
        num = parseInt(args[1])
        if (isNaN(num)){
            num = 1
        };
    };

    if (coinData [message.author.id].coins < item.cost * num) {
        message.channel.send("You don't have enough coins!");
        return;
    }

    coinData[message.author.id].coins = allc - item.cost * num;
    coinData[message.author.id].inventory[item.dn] = inum + num;

    fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
        if (err) throw err;
        message.channel.send(`${num} ${item.name}${num == 1 ? '' : 's'} purchased for ${num*item.cost} coin${item.cost*num == 1 ? '' : 's'}!`);
    });

}

function buyItem(message, args) {
    console.log(3.0);
    ensureUserInDB(message.author);
    switch (args[0].toLowerCase()) {
        case 'coin':
            if(args[1] == auth.token) {
                let currentCoin = parseInt(coinData [message.author.id].coins);
                coinData [message.author.id].coins = currentCoin + (args[2] ? args[2] : 1);
                fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
                    if (err) throw err;
                });
            }

            break;
        case 'cookie':
            purchaseItem(message,args,{name: 'Cookie', cost: parseInt(cookiePrice), dn: 'cookies'});
            break;
        case 'tonk':
            purchaseItem(message,args,{name: 'Tonk', cost: parseInt(tonkPrice), dn: 'tonks'});
            break;
        case 'tank':
            purchaseItem(message,args,{name: 'Tank', cost: parseInt(tonkPrice), dn: 'tonks'});
            break;
        case 'arm':
            purchaseItem(message,args,{name:'Long Arm', cost: parseInt(armPrice), dn: 'longarm'});
            break;
        case 'tape':
            purchaseItem(message,args,{name: 'Duck tape', cost: parseInt(tapePrice), dn: 'ducttape'});
            break;
        default:
            message.channel.send(`\'${args[0]}\' is not a valid item. Type \"${ALT_PREFIX}shop help\" for more info.`);
    }
}

function cookieHeist(message, args) {

    let enemy = message.mentions.users.first();
    if(Object.keys(args).length == 0 || enemy == null){
        message.channel.send("You must mention a user!")
        return;
    };
    opponent = message.mentions.users.first().id
    
    if (!coinData [opponent]){
        message.channel.send("I don't recognize this user!")
        return;
    };

    if(coinData[enemy.id].inventory.cookies == 0) {
        message.channel.send("Your opponent doesn't have any cookies! They should buy some...");
        return;
    };
    enemyMention = message.mentions.users.first()
    var random = Math.floor (Math.random() * (50))
    var rn = Math.random() * 100
    challenger = parseInt(coinData [message.author.id].inventory.cookies)
    enemy = parseInt(coinData [opponent].inventory.cookies)
    enemyTape = parseInt(coinData [opponent].inventory.ducttape)
    challengerArm = parseInt(coinData [message.author.id].inventory.longarm)
    /*yeet = parseInt(challenger + (enemy-challengerArm))
    yeet1 = parseInt(challenger-enemyTape)
    yeet2 = parseInt(yeet1 / yeet * 100)*/
    winnerVar0 = parseInt(challenger + (enemy-challengerArm))
    winnerVar1 = parseInt(challenger-enemyTape)
    winnerVar = parseInt(winnerVar1 / winnerVar0 * 100)
    //message.channel.send(winnerVar+" is the chance to win without arms and tape. "+yeet2+" are your new chances with the tape.")
    /*channel.send(challenger)
    channel.send(enemy)
    channel.send(winnerVar.toFixed(3))*/
    if (winnerVar > rn) { //sender won
        winner = message.author.id
        loser = message.mentions.users.first().username
        if (coinData[opponent].coins < random) {
            coins = parseInt(coinData [message.author.id].coins)
            gained = parseInt(coinData [opponent].coins)
            cookieHeistMessage = new Discord.MessageEmbed ()
                .setAuthor('COOKIE HEIST')
                .setFooter("You're the best cookie thief!")
                .setDescription('**<@'+winner+'> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole '+gained+' coins from '+loser+'! :D**')
                .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                .setColor('#f5e042')
            coinData [message.author.id].coins = coins + gained
            coinData [opponent].coins = 0
            fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
                if (err) throw err;
            });
            message.channel.send(cookieHeistMessage)
            return;
        }
        else {
            cookieHeistMessage = new Discord.MessageEmbed ()
                .setAuthor('COOKIE HEIST')
                .setFooter("You're the best cookie thief!")
                .setDescription('**<@'+winner+'> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole '+random+' coins from '+loser+'! :D**')
                .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                .setColor('#f5e042')
            coins = coinData [message.author.id].coins
            coinData [message.author.id].coins = coins + random
            coins2 = coinData [opponent].coins
            coinData [opponent].coins = coins2 - random
            fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
                if (err) throw err;
            });
            message.channel.send(cookieHeistMessage)
            return;
        };
    }
    if (winnerVar < rn) { //the other person won, not sender
        winner = message.mentions.users.first().id
        loser = message.author.username
        if (coinData [opponent].coins < random) {
            coins = parseInt(coinData [opponent].coins)
            gained = parseInt(coinData [message.author.id].coins)
            cookieHeistMessage = new Discord.MessageEmbed ()
                .setAuthor('COOKIE HEIST')
                .setFooter("You're the best cookie thief!")
                .setDescription("**<@"+winner+"> the battle was brutal.. cookies crumbled...\nYou have won the cookie heist!! You stole "+gained+" coins from "+loser+"! :D**")
                .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                .setColor('#f5e042')
            coinData [opponent].coins = coins + gained
            coinData [message.author.id].coins = 0
            fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
                if (err) throw err;
            });
            message.channel.send(cookieHeistMessage)
            return;
        }
        else {
            coins = parseInt(coinData [opponent].coins)
            coinData [opponent].coins = coins + random
            cookieFightMessage = new Discord.MessageEmbed ()
                .setAuthor('COOKIE HEIST')
                .setFooter("You're the best cookie thief!")
                .setDescription("**<@"+winner+"> the battle was brutal.. cookies crumbled...\nYou have successfully completed the heist!! You stole "+random+" coins from "+loser+"! :D**")
                .setImage('https://media.discordapp.net/attachments/726550648660688979/730109749009317999/c59c3d8062d81a6771737486e9de5211.png')
                .setColor('#f5e042')
            coins2 = coinData [message.author.id].coins
            coinData [message.author.id].coins = coins2 - random
            fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
                if (err) throw err;
            });
            message.channel.send(cookieFightMessage)
            return;
        };
    };
};
function cookieFight(message, args) {
    enemy = message.mentions.users.first();
    //use fight (data/users/fight.json) for fight data

    if(Object.keys(args).length == 0 || enemy == null){
        message.channel.send("You must mention a user!")
        return;
    };

    opponent = message.mentions.users.first().id;

    if (!coinData [opponent]){
        message.channel.send("I don't recognize this user!")
        return;
    };

    if(coinData[opponent].inventory.cookies == 0) {
        message.channel.send("Your opponent doesn't have any cookies! They should buy some...");
        return;
    };
    if( !fight[message.channel.id] || fight[message.channel.id].fightActive==0){
        numberOfFights+=1
        fight[message.channel.id]={
            "fightActive":1,
            "challengerF":message.author.id,
            "opponentF":opponent
        }
        fs.writeFile ("./data/users/fight.json", JSON.stringify(fight,null,4), err => {
            if (err) throw err;
        });
        message.channel.send("<@"+opponent+">, <@"+message.author.id+"> has challenged you to a cookie fight! Type "+ALT_PREFIX+"accept, or "+ALT_PREFIX+"deny!")
        fightTimer(message)
        return;
    }
    if (fight[message.channel.id].fightActive==1){
        message.channel.send("There is already a fight taking place here!")
        return;
    };


}

function fightTimer (message){
    //client.setTimeout(300000)
    fightTime = client.setTimeout(() => {
        if(fight[message.channel.id].fightActive==1){
            fight[message.channel.id].fightActive=0
            fs.writeFile ("./data/users/fight.json", JSON.stringify(fight,null,4), err => {
                if (err) throw err;
            });
            message.channel.send("A player took too long to respond! Fight request canceled.")
        }
        else{
            
        }
    }, /*300000*/20000)
}

function denyFight(message){
    if(!fight[message.channel.id]||fight[message.channel.id].fightActive==0){
        message.channel.send("There are no fights to cancel!")
        return;
    }
    if(fight[message.channel.id].fightActive==1){
        if(fight[message.channel.id].opponentF==message.author.id){
            client.clearTimeout(fightTime, 0)
            fight[message.channel.id].fightActive=0
            fs.writeFile ("./data/users/fight.json", JSON.stringify(fight,null,4), err => {
                if (err) throw err;
            });
            message.channel.send("Fight canceled!")        
            return;
        }
        else{
            message.channel.send("There are no fights to cancel!")
            return;
        };
    };
}

function acceptFight(message){
    message.channel.send("Fight request has been accepted!")
    startFight(message)
}

function startFight(message){
    
}

function displayBank(msg) {
    user = msg.author.id
    coinsInBank = parseInt(coinData [user].bank.amount)
    bankMessage = new Discord.MessageEmbed ()
        .setAuthor('Bank')
        .setDescription('<@'+user+'>')
        .addField("**Money in the Bank: **", coinsInBank)
        .setThumbnail("https://media.discordapp.net/attachments/726550648660688979/730848313309659226/bank_door.jpg")
        .setColor('#f5e042')
    msg.channel.send(bankMessage)
}


function cookieBank(msg, args) {
    let _id = msg.author.id
    if(Object.keys(args) == 0) {
        displayBank(msg);
        coinData[_id].bank.lastInteract = Date.now();
        fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
            if (err) console.log(err);
        });
        return;
    }
    switch (args[0].toLowerCase()) {
        case 'withdraw':
            bankWithdraw(msg,args.pop());
            break;
        case 'deposit':
            bankDeposit(msg,args/*.pop()*/);
            break;
        case 'info':
            displayBank(message);
            break;
        case 'help':
            msg.channel.send("Display bank help here");
            break;
        default:
            msg.channel.send(`Type \"${ALT_PREFIX}bank help\" for help on using the bank!`);
    }
}

function catchErr (err, message) {
    message.channel.send(`${message.author.username}, the bot has run into a fatal error: \`\`\`${err}\`\`\``)
};

function bankWithdraw(msg, args) {
    msg.channel.send(typeof args[0])
    msg.channel.send(args[0])
    let _id = msg.author.id;
    let amount = -1;

    //Get user's data
    let allc = parseInt(coinData[_id].coins);
    let bbNoI = parseInt(coinData[_id].bank.amount);
    let bbWithI = Math.floor(bbNoI * Math.pow((1 + 0.1/28800000),((parseInt(coinData[_id].bank.lastInteract) - Date.now()) * (28800000/3600000)))); //A=P(1+r/n)^tn

    coinData[_id].bank.lastInteract = Date.now();

    //Check to see if they have a valid number
    if((Object.keys(args).length == 0) || (isNaN(args[0]))) {
        msg.channel.send("There is no number argument")
        amount = bbWithI;
    } else {
        msg.channel.send("There is a number argument")
        amount = parseInt(args[0]);
    };

    //Check to see if they have enough coins
    if(amount > bbWithI) {
        msg.channel.send(`${amount} coin${amount == 1 ? '' : 's'} is too many! You only have ${bbWithI}.`);
    } else {
        coinData[_id].coins = allc + amount;
        coinData[_id].bank.amount = bbWithI - amount;

        msg.channel.send(`${amount}/${bbWithI} Coins have been withdrawn from the bank!, leaving ${bbWithI-amount} coin${bbWithI-amount == 1 ? '' : 's'} remaining.\nYou now have ${allc + amount} coin${bbWithI-amount == 1 ? '' : 's'}!`);
    };

    fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
        if (err) console.log(err);
    });
}

function bankDeposit(msg, args) {
    msg.channel.send(args[0])
    let _id = msg.author.id;
    let amount = -1;

    //Get user's data
    let allc = parseInt(coinData[_id].coins);
    let bbNoI = parseInt(coinData[_id].bank.amount);
    let bbWithI = Math.floor(bbNoI * Math.pow((1 + 0.1/28800000),((Date.now() - parseInt(coinData[_id].bank.lastInteract)) * (28800000/3600000)))); //A=P(1+r/n)^tn

    coinData[_id].bank.lastInteract = Date.now();

    //Check to see if they have a valid number
    if(Object.keys(args).length == 0 || isNaN(args[0])) {
        amount = allc;
    } else {
        amount = parseInt(args[0]);
        msg.channel.send(args[0])
    };

    //Check to see if they have enough coins
    if(amount > allc) {
        msg.channel.send(`${amount} coin ${amount == 1 ? '' : 's'} is too many! You only have ${bbWithI}.`);
    } else {
        coinData[_id].coins = allc - amount;
        coinData[_id].bank.amount = bbWithI + amount;

        msg.channel.send(`${amount}/${allc} Coins have been deposited into the bank!, leaving ${allc-amount} coin + ${allc-amount == 1 ? '' : 's'} + remaining.\nYou now have ${bbWithI + amount} coin${bbWithI + amount == 1 ? 's' : ''} in the bank!`)
    };

    fs.writeFile ("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
        if (err) console.log(err);
    });
}

function spamMessage(message) {
    mention = message.mentions.users.first()
                if (mention == null) {return;}
                mentionMessage = message.content.slice(6)
                message.channel.send(mentionMessage)
}


function getAvitar(channel, person) {
    try {
        if (fs.existsSync('./images/avitars/' + person + '.png')) {
            channel.send(new Discord.MessageAttachment('./images/avitars/' + person + '.png'));
        } else {
            channel.send(`Trainer ${person} not found.`);
        }
    } catch(e) {
        channel.send(`Trainer ${person} has made an error!`);
    }

}

function makeChannel(message) {
    let server = message.guild;
    let name = message.author.username;

    //let newChannel = new Discord.TextChannel(server, "test").setName("testName").then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
  //.catch(console.error);
  //let mySpot = server.
  server.channels.create(`${name}\'s  channel`)
  .then(channel => {
    let category = server.channels.cache.find(c => c.name == "bot-channels" && c.type == "category");

    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
  }).catch(console.error);

}

function ensureUserInDB(user) {
    let data = JSON.parse(fs.readFileSync("./data/users/userData.json", "utf8"));
    if(!data[user.id]) {
        let shell = JSON.parse(fs.readFileSync("./data/users/userDataShell.json", "utf8"));
        data[user.id] = shell;

        data[user.id].records.timeCreated = Date.now();

        fs.writeFile("./data/users/userData.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
            else console.log(user.id + " has been added!")
        });
    } else {
        //fs.writeFile("./data/users/userData.json", JSON.stringify(data), (err) => {
        //    if (err) console.error(err)
        //});
    }
    if(!coinData[user.id]) {
        coinData[user.id] = {
            coins: 0,
            message: "(None)",
            inventory: {
                cookies: 0,
                tonks: 0,
                ducttape: 0,
                longarm: 0
            },
            bank: {
                amount: 0,
                lastInteract: Date.now()
            }
        };
    }
    fs.writeFile("./data/users/coinData.json", JSON.stringify(coinData,null,4), err => {
        if (err) console.log(err);
    });
}

function dataStorage(message) {
    let channel = message.channel;
    let user = message.author;
    let cont = message.content;

    let parts = JSON.parse(fs.readFileSync("./robotParts.json", "utf8"));
    let data = JSON.parse(fs.readFileSync("./userData.json", "utf8"));

    ensureUserInDB(user)

    return "done";
}

client.login(auth.token);
