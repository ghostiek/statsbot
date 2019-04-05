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
      x => x.Topic.toLowerCase() === resourceTopic.toLowerCase()
    );
    if (resource === undefined) {
      message.channel.send("Resource doesn't exist");
      return;
    }

    const overviewlinks = resource.Overview.join('\n');

    const display = `
**Topic**: ${resource.Topic}

**Overview**:
${overviewlinks}
**Futher Reading**:
${resource.FurtherReading.join('\n')}`;
    message.channel.send(display);
  }
};
