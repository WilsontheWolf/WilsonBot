const Doc = require('guildscript-docs');
const RawComponent = require('guildscript/src/messageComponents/RawComponent');

module.exports = {
    name: 'docs',
    description: 'Get info from the guildscript docs.',
    usage: '[query]',
    teamOnly: false,
    level: 0,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args, level) => {
        if(!args[0]) return message.channel.send('Please include what you want to search.');
        const doc = await Doc.fetch('master');
        const embed = doc.resolveEmbed(args.join(' '));
        if(!embed) return message.channel.send('No data found.');
        message.channel.send(new RawComponent({
            object: 'block',
            type: 'webhookMessage',
            data: {
                embeds: [embed]
            },
            nodes: []
        }));
    }
};