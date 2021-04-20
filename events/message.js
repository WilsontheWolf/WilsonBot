const { MessageBuilder, CodeBlock } = require('guildscript');

// eslint-disable-next-line no-unused-vars
module.exports = async (client, message) => {
    // Ignore messages from ourselves. Prevents loops.
    if (message.author.id === client.user.id) return;

    // Here we get the content check if the prefix matches 
    // and split it into arguments.
    let content = message.content.toString();
    const args = content.trim().split(/ +/g);
    if (!args[0].startsWith(client.config.prefix))
        return;
    args[0] = args[0].slice(client.config.prefix.length);
    const command = args.shift().toLowerCase();

    // Here we get the command
    const cmd = client.commands.get(command);

    // If there is no command return.
    if (!cmd) return;

    // If there is no team (a direct message) and this 
    // command has teamOnly on return.
    if (!message.team && cmd.teamOnly)
        return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');

    // Get the user's level
    let level = 0;
    for (let i = 0; i < client.config.perms.length; i++) {
        let l = client.config.perms[i];
        if (await l.check(message)) level = l.level;
    }


    // If the user's level is too low to run the command error.
    if (cmd.level > level) return message.channel.send(`You don't have the permissions to run this command.
You need to be a ${client.config.perms.find(p => p.level === cmd.level).name} (${cmd.level})
You are a ${client.config.perms.find(p => p.level === level).name} (${level})`);

    try {
        // Run the command
        console.log(`${message.author.name} ran command ${command}.`);
        await cmd.run(client, message, args, level);
    } catch (e) {
        // Catch errors running the command and show errors to the user.
        console.error('Error running command!');
        console.error(e);
        message.channel.send(
            new MessageBuilder('There was an unexpected error running that command.',
                new CodeBlock(e.toString())
            )
        );
    }
};
