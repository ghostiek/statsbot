const { Command } = require('discord.js-commando');
const path = require('path');
const fetch = require('node-fetch');

const groupName = __dirname
  .split(path.sep)
  .pop()
  .toLowerCase();

const url = 'https://api.thecatapi.com/v1/images/search';

const { CAT_API_KEY } = require('../../auth/config.json');

const header = {
  'X-API-KEY': CAT_API_KEY,
};

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
    const content = await fetch(url, {
      headers: header,
    }).then(res => res.json());
    message.channel.send('Meow', {
      files: content.map(x => x.url),
    });
  }
};
