const { Embed } = require('guildscript');
const { version: guildscriptVersion } = require('guildscript/package.json');
const { version } = require('../package.json');
module.exports = {
    name: 'stats',
    description: 'Shows bot stats.',
    usage: '[query]',
    teamOnly: false,
    level: 0,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args, level) => {
        const embed = new Embed()
            .setTitle('Stats')
            .addField(`${client.user.name} Version`, `v${version}`, true)
            .addField('GuildScript Version', `v${guildscriptVersion}`, true)
            .addField('Node.js Version', process.version, true)
            .addField('Memory', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField('Cache', `${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.teams.cache.size} teams.`, true)
            .addField('Code', 'The source code is available [here](https://github.com/WilsontheWolf/WilsonBot).')
            .setFooter(`Requested by ${message.author.name}`)
            .setTimestamp();
        message.channel.send(embed);
    }
};
