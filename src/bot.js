/*
Here we gooooooooooo.
*/

// Imports
const fs = require('fs')
const Discord = require('discord.js');

// Grab config info from the secret config.
const { token, prefix } = require('./auth/config.json');

// Grab a new Discord client instance
const client = new Discord.Client();

//Initialize commands
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Ready player one
// AKA waits for 'ready' event to fire, and then lets the world (e.g. the console) know.
client.on('ready', () => {
  console.log(`${client.user.tag} online... beep boop.`);
});


//Listening to messages to trigger commands
client.on('message', message => {

  //Ignores messages without prefix or bot messages
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  //Ignore invalid commands
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  //Verifies if the command was sent as a DM or was executed on the server
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  //Inform user that his command was incorrectly formatted
  if (command.args && args.length < command.minArgs) {
    let reply = `You didn't provide enough arguments, ${message.author}!`;

    //Explains format if defined
    if (command.usage) {
      reply += `\nThe proper usage of this function would be \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});


client.login(token);
