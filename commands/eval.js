module.exports = {
    name: 'eval',
    usage: '[code]',
    teamOnly: false,
    level: 9,
    description: 'Run JS code.'
};
const Guilded = require('guildscript');
// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
    let code = args.join(' ');
    let response;
    let e = false;
    try {
        if (code.includes('await') && !message.content.includes('\n'))
            code = '( async () => {return ' + code + '})()';
        else if (code.includes('await') && message.content.includes('\n'))
            code = '( async () => {' + code + '})()';
        response = await eval(code);
        if (typeof response !== 'string') {
            response = require('util').inspect(response, { depth: 3 });
        }
    } catch (err) {
        e = true;
        response = err.toString();
    }
    response = response.replace(client.config.password, '*******');
    const length = response.length;
    let msg = new Guilded.MessageBuilder(new Guilded.Text(`${e ? 'Error' : 'Success'}`, ['bold']), new Guilded.CodeBlock(response.substr(0, 3000), 'javascript'));
    if (length >= 3000) {
        msg.add('The response was too long with a length of ', new Guilded.Text(`${length}/3000`, 'inline-code-v2'), 'characters.');
    }
    message.channel.send(msg);
};