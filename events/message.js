module.exports = async (sakura, message) => {
    if (message.content.indexOf("+") !== 0) return;
    const args = await message.content.slice(1).trim().split(/ +/g);
    const commandName = await args.shift().toLowerCase();
    const command = sakura.commands.get(commandName) || sakura.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    if (message.author.id != "379267610564362243" && message.author.id != "301616576313032715") return;
    command.execute(sakura, message, args);
}