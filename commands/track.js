const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'track',
    async execute(Client, message, args) {
        if (!args[0]) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription("To use this command please use all the inputs `+track <Server ID> <Code>`")
                .setTimestamp()
                .setColor('GREEN')
            return message.channel.send(embed);
        };
        const Guild = Client.guilds.cache.get(args[0]);
        if (!Guild) return message.channel.send("I can't find this `Guild`.");
        Guild.fetchInvites()
            .then(invites => {

                let invite = invites.find(i => i.code === args[1]);

                if (!invite) return message.channel.send("I can't find this specific invite code, please type `+invitelinks` to get all the invite links");
                let embed = new Discord.MessageEmbed()
                    .setAuthor(invite.guild.name, invite.guild.iconURL({
                        dynamic: true
                    }))
                    .addFields({
                        name: '💻 Server',
                        value: invite.guild.name,
                        inline: true
                    }, {
                        name: '🔗 Invite Code',
                        value: `https://discord.gg/${invite.code}`,
                        inline: true
                    }, {
                        name: '⚙️ Channel',
                        value: invite.channel.name,
                        inline: true
                    }, {
                        name: '⚖️ Uses',
                        value: invite.uses,
                        inline: true
                    })
                    .setTimestamp()
                    .setColor('BLUE')
                message.channel.send(embed)


            }) //
            .catch(console.error);
    }
};