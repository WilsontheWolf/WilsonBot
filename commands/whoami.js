const { Embed } = require('guildscript');

module.exports = {
    name: 'whoami',
    description: 'Shows info about you.',
    usage: '',
    teamOnly: false,
    level: 0,
    // eslint-disable-next-line no-unused-vars
    run: (client, message, args, level) => {
        const u = message.author;
        const embed = new Embed()
            .setTitle(u.name)
            .addField('ID:', u.id, true)
            .addField('Joined Guilded:', u.joinTime.toDateString(), true)
            .addField('Last Online:', u.lastOnline.toDateString(), true)
            .setThumbnail(u.avatarURL)
            .setDescription(u.about.bio || u.about.tagLine || 'No description');

        message.channel.send(embed);
    }
};
