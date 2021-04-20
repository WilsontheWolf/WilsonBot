// eslint-disable-next-line no-unused-vars
module.exports = async (client) => {
    console.log(`Connected as ${client.user.name} (${client.user.id}).`);
    console.log(`I'm in ${client.teams.cache.size} team(s).`);

    client.user.setPresence('online');
};