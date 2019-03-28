const { token, prefix, owners, inviteLink } = require('./auth/config.json');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');


const directoryNames = fs.readdirSync('./commands').filter(file => !file.match(/\..+$/));
const groups = directoryNames.map(file => [file.toLowerCase(), file]);

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owners,
    invite: inviteLink
});


client.registry
	.registerDefaultTypes()
	.registerGroups(groups)
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setActivity('with data!');
});

client.on('error', console.error);

client.login(token);
