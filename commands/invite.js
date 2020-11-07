
module.exports = {
    name: 'invite',
    async execute(Client, message, args) {
        message.channel.send(`https://discord.com/api/oauth2/authorize?client_id=772507243060133897&permissions=33&scope=bot`);
    }

};

