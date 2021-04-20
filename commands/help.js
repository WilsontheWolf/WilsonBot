const Guilded = require('guildscript');

module.exports = {
    name: 'help',
    description: 'Shows all the commands.',
    usage: '[command]',
    teamOnly: false,
    level: 0,
    // eslint-disable-next-line no-unused-vars
    run: (client, message, args, level) => {
        // No arguments. Show all the commands
        if (!args[0]) {
            const embed = new Guilded.Embed()
                .setTitle(`${client.user.name} help.`)
                .setDescription(`My prefix is \`${client.config.prefix}\`. For more help on a command run \`${client.config.prefix}help [command]\`.`);
            // Only show commands the user can run.
            const cmds = message.team ?
                client.commands.filter(cmd => cmd.level <= level) :
                client.commands.filter(cmd => cmd.level <= level && cmd.teamOnly !== true);
            cmds.forEach(cmd => {
                embed.addField(
                    `${client.config.prefix}${cmd.name} ${cmd.usage}`,
                    `${cmd.description || 'No description'}`,
                    true);
            });
            message.channel.send(embed);
            // for a specific command
        } else {
            let cmd = client.commands.get(args[0]);
            if (!cmd) return message.channel.send(`No command found called \`${args[0]}\`. To see all the commands run \`${client.config.prefix}help\`.`);
            const embed = new Guilded.Embed()
                .setTitle(`${cmd.name}:`)
                .setDescription(`**${client.config.prefix}${cmd.name} ${cmd.usage}**
${cmd.description || 'No description'}`)
                .addField('Guild Only:', cmd.teamOnly.toString());
            message.channel.send(embed);
        }
    }
};
