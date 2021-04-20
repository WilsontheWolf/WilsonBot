const config = {
    // Login info
    email: 'youremail@mail.com',
    password: 'yourPassword',
    // Your id. You can get this via the whoami command
    ownerID: '2d291BZ4',
    // The ids of your bot admins. Be careful who you give this to
    // as they get eval perms.
    adminIDS: ['pmbOg1MA', 'Qd5zODrm'],
    // The prefix. Commands to the bot must start with this.
    prefix: 'w!'
};

// Permission levels.
config.perms = [
    {
        level: 0,
        name: 'User',
        check: () => true
    },
    // Note as of right now there is no way to check 
    // user's perms in a channel or team. As such there
    // is no moderator perms yet. Will come soon-ish.
    {
        level: 9,
        name: 'Bot Admins',
        check: (message) => config.adminIDS.includes(message.author.id)
    },
    {
        level: 10,
        name: 'Bot Owner',
        check: (message) => message.author.id === config.ownerID
    }
];

module.exports = config;