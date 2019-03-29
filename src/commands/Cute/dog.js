const { Command } = require('discord.js-commando');
const path = require('path');
const fetch = require('node-fetch');

const groupName = __dirname
  .split(path.sep)
  .pop()
  .toLowerCase();

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
    const content = await fetch(url).then(res => res.json());
    message.channel.send('Woof', {
      files: [content.url],
    });
  }
};
