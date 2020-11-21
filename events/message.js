module.exports = async (sakura, message) => {
    if (message.content.indexOf("+") !== 0) return;
    const args = await message.content.slice(1).trim().split(/ +/g);
    const commandName = await args.shift().toLowerCase();
    const command = sakura.commands.get(commandName) || sakura.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    command.execute(sakura, message, args);
}
