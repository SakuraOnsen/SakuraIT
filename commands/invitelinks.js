const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'invitelinks',
    async execute(Client, message, args) {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription("To use this command please use all the inputs `+invitelinks <Server ID>`")
                .setTimestamp()
                .setColor('GREEN')
            return message.channel.send(embed);
        };
        const Guild = Client.guilds.cache.get(args[0]);
        if (!Guild) return message.channel.send("I can't find this `Guild`.");
        Guild.fetchInvites()
            .then(invites => {
                let invite = invites.filter(i => i.inviter.id === "772507243060133897");
                if (!invite) return message.channel.send(`I can't find any invite link that was created by me.`)
                let links = invite.array();
                let embed = new MessageEmbed()
                for (let i = 0; i < links.length; i++) {
                    embed.addField(`Invite:`, `Code: ${links[i].code} | Uses: ${links[i].uses}`)
                }
                embed.setAuthor(Guild.name, Guild.iconURL({
                    dynamic: true
                }))
                embed.setColor('AQUA')
                embed.setTimestamp()
                message.channel.send(embed)
            })
            .catch(e => message.channel.send(e.message));


    }

};