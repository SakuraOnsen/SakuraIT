const { Client , Intents } = require('discord.js');

require('dotenv').config();
const Client = new Client({
    disableMentions: "everyone",
    ws: {
        intents: Intents.ALL
    }
});

Client.login(process.env.TOKEN);
require('./handler')(Client);

Client.on('ready', () => {
    console.log(`Client is on`);

});