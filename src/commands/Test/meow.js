const { Command } = require('discord.js-commando');
const path = require('path');

const groupName = __dirname.split(path.sep).pop().toLowerCase();

module.exports = class MeowCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meow',
      group: groupName,
      memberName: 'meow',
      description: 'Posts a cat picture.',
    });
  }

  run(message) {
    message.channel.send('Meow');
  }
};