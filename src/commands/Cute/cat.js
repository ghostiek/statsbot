const { Command } = require('discord.js-commando');
const path = require('path');
const request = require('request-promise');

const groupName = __dirname.split(path.sep).pop().toLowerCase();

const url = 'http://aws.random.cat/meow';

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			group: groupName,
			memberName: 'cat',
			description: 'Posts a cat picture.',
		});
	}

	async run(message) {
        const content = await request.get(url);
        const picurl = JSON.parse(content).file;
        message.channel.send("Meow",{
            files: [picurl]
        });	
    }
};