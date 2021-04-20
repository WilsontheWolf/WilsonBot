const { Client } = require('guildscript');
const fs = require('fs/promises');
const Collection = require('@discordjs/collection');
const client = new Client();
client.config = require('./config');
client.commands = new Collection();

(async () => {
    // Load our commands.
    let commands = await fs.readdir('./commands');
    console.log(`Loading ${commands.length} command(s).`);
    let done = 0;
    commands.forEach(cmd => {
        if (!cmd.endsWith('.js')) return;
        try {
            console.log(`Loading command ${cmd}...`);
            const c = require(`./commands/${cmd}`);
            client.commands.set(c.name, c);
            done++;
        } catch (e) {
            console.error(`Error loading command ${cmd}:`);
            console.error(e);
            return e;
        }
    });
    console.log(`Successfully loaded ${done}/${commands.length} command(s).`);
    // Load events
    let events = await fs.readdir('./events');
    console.log(`Loading ${events.length} event(s).`);
    done = 0;
    events.forEach(evt => {
        if (!evt.endsWith('.js')) return;
        try {
            console.log(`Loading event ${evt}...`);
            const e = require(`./events/${evt}`);
            client.on(evt.split('.')[0], e.bind(null, client));
            done++;
        } catch (e) {
            console.error(`Error loading event ${evt}:`);
            console.error(e);
        }
    });
    console.log(`Successfully loaded ${done}/${events.length} event(s).`);
    // Login to guilded
    await client.login(client.config.email, client.config.password);
})();