/* eslint-disable class-methods-use-this */
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
      name: 'getdoc',
      group: groupName,
      memberName: 'getdoc',
      description: 'Gets the resource',
      args: [
        {
          key: 'resourceTopic',
          prompt: "What is the topic you'd like to fetch?",
          type: 'string',
        },
      ],
    });
  }

  run(message, { resourceTopic }) {
    const resource = resourcelist.find(
      x => x.topic.toLowerCase() === resourceTopic.toLowerCase()
    );
    if (resource === undefined) {
      message.channel.send(
        "Resource doesn't exist. Please check https://ghostiek.github.io/StatsResources/ for a full list of commands."
      );
      return;
    }

    const display = `
**Topic**: ${resource.topic}

**Overview**:
${resource.overview.join('\n')}
**Futher Reading**:
${resource.furtherreading.join('\n')}`;
    message.channel.send(display);
  }
};
