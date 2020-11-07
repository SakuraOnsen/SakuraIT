const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'createinvite',
    async execute(Client, message, args) {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({
                    dynamic: true
                }))
                .setDescription("To use this command please use all the inputs `+createinvite <Server ID> <Channel ID>`")
                .setTimestamp()
                .setColor('GREEN')
            return message.channel.send(embed);
        };
        const Guild = Client.guilds.cache.get(args[0]);
        if (!Guild) return message.channel.send("I can't find this `Guild`.");
        const Channel = Guild.channels.cache.get(args[1]);
        if (!Channel) return message.channel.send("I can't find this `Channel`.");
        Channel.createInvite({
            reason: "Sakura Onsen ad invite link.",
            maxAge: 0,
        }).then(invite => {
            let embed = new MessageEmbed()
                .setAuthor(Guild.name, Guild.iconURL({
                    dynamic: true
                }))
                .setColor('RED')
                .setFooter(`To track the invite use +track <invite code>`)
                .setDescription(`Sakura made an invite link for the server ${Guild.name}`)
                .addFields({
                    name: '💻 Server',
                    value: Guild.name,
                    inline: true
                }, {
                    name: '🔗 Invite Code',
                    value: `https://discord.gg/${invite.code}`,
                    inline: true
                }, {
                    name: '⚙️ Channel',
                    value: Channel.name,
                    inline: true
                });
            message.channel.send(embed);
        });


    }
};