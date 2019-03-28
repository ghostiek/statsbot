const { Command } = require('discord.js-commando');
const path = require('path');
const request = require('request-promise');

const groupName = __dirname.split(path.sep).pop().toLowerCase();

const url = 'http://random.dog/woof.json';

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			group: groupName,
			memberName: 'dog',
			description: 'Posts a dog picture.',
		});
	}

	async run(message) {
        const content = await request.get(url);
        const picurl = JSON.parse(content).url;
        message.channel.send("Woof",{
            files: [picurl]
        });	
    }
};