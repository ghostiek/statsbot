/* eslint-disable class-methods-use-this */
const fs = require('fs');
const { Command } = require('discord.js-commando');
const path = require('path');
const resourcelist = require('../../data/resources.json');

const groupName = __dirname
  .split(path.sep)
  .pop()
  .toLowerCase();

module.exports = class CreateDocCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'deletedoc',
      group: groupName,
      memberName: 'deletedoc',
      description: 'Deletes a resource',
      args: [
        {
          key: 'resourceTopic',
          prompt: "What is the topic you'd like to add?",
          type: 'string',
        },
      ],
    });
  }

  async run(message, { resourceTopic }) {
    const resource = resourcelist.find(
      x => x.topic.toLowerCase() !== resourceTopic.toLowerCase()
    );
    if (resource === undefined) {
      message.channel.send("Command doesn't exist.");
      return;
    }

    for (let i = 0; i < resourcelist.length; i += 1) {
      if (resourcelist[i].topic === resourceTopic) {
        resourcelist.splice(i, 1);
        break;
      }
    }
    await fs.writeFile(
      './data/resources.json',
      JSON.stringify(resourcelist),
      err => {
        if (err) throw err;
      }
    );
    message.channel.send('Command successfully deleted!');
  }
};
