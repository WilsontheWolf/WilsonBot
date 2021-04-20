module.exports = {
    name: 'say',
    description: 'I say what you say.',
    usage: '[message]',
    teamOnly: false,
    level: 0,
    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args, level) => {
        let content = message.content.content;
        if ((content[0].type != 'paragraph')) return message.channel.send(message.content);
        // Remove the say part from the command
        content[0].content[0].text = content[0].content[0].text.substr(client.config.prefix.length + 3);
        message.channel.send(message.content);
    }
};
