/* eslint-disable class-methods-use-this */
const fs = require('fs');
const { Command } = require('discord.js-commando');
const path = require('path');
const resourcelist = require('../../data/resources.json');

const groupName = __dirname
  .split(path.sep)
  .pop()
  .toLowerCase();

const overviewAliases = ['overview', 'o'];
const furtherReadingAliases = ['further reading', 'furtherreading', 'fr'];

module.exports = class CreateDocCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'updatedoc',
      group: groupName,
      memberName: 'updatedoc',
      description: 'Updates a resource',
      args: [
        {
          key: 'resourceTopic',
          prompt: "What is the topic you'd like to update?",
          type: 'string',
        },
        {
          key: 'resourceType',
          prompt:
            'What part of the resource would you like to update? (Overview/Further Reading)',
          type: 'string',
          oneOf: overviewAliases.concat(furtherReadingAliases),
        },
        {
          key: 'resourceLink',
          prompt: "What is the link you'd like to use instead?",
          type: 'string',
        },
      ],
    });
  }

  async run(message, { resourceTopic, resourceType, resourceLink }) {
    const type =
      overviewAliases.indexOf(resourceType) !== -1
        ? 'overview'
        : 'furtherreading';

    const resource = resourcelist.find(
      x => x.topic.toLowerCase() === resourceTopic.toLowerCase()
    );
    if (resource === undefined) {
      message.channel.send("Command doesn't exist, run createdoc instead");
      return;
    }

    for (let i = 0; i < resourcelist.length; i += 1) {
      if (resourcelist[i].topic === resourceTopic) {
        resourcelist[i][type] = [resourceLink];
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
    message.channel.send('Command successfully updated!');
  }
};
