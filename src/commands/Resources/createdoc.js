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
      name: 'createdoc',
      group: groupName,
      memberName: 'createdoc',
      description: 'Creates a resource',
      args: [
        {
          key: 'resourceTopic',
          prompt: "What is the topic you'd like to add?",
          type: 'string',
        },
        {
          key: 'resourceType',
          prompt: 'What kind of resource is it? (Overview/Further Reading)',
          type: 'string',
          oneOf: overviewAliases.concat(furtherReadingAliases),
        },
        {
          key: 'resourceLink',
          prompt: "What is the link you'd like to add?",
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
      x => x.Topic.toLowerCase() === resourceTopic.toLowerCase()
    );
    if (resource !== undefined) {
      message.channel.send('Command already exists, run updatedoc instead');
      return;
    }

    const overviewLink = type === 'overview' ? resourceLink : '';
    const furtherreadingLink = type === 'furtherreading' ? resourceLink : '';

    const obj = {
      Topic: resourceTopic,
      Overview: [overviewLink],
      FurtherReading: [furtherreadingLink],
    };
    resourcelist.push(obj);

    await fs.writeFile('./data/resources.json', JSON.stringify(resourcelist), err => {
        if (err) throw err;
      }
    );
    message.channel.send('Command successfully added!');
  }
};
