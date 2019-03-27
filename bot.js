/*
Here we gooooooooooo.
*/

// Imports
const Discord = require('discord.js');

// Grab a new Discord client instance
const client = new Discord.Client();

// Grab config info from the secret config.
const { token, prefix } = require('./auth/config.json');

async function parseCommand(msg) {
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift();

  switch (command) {
    case 'ping':
      msg.channel.send('Pong!');
      break;
    default:
      break;
  }
}

// Ready player one
// AKA waits for 'ready' event to fire, and then lets the world (e.g. the console) know.
client.on('ready', () => {
  console.log(`${client.user.tag} online... beep boop.`);
});

// When receiving a 'message' event, decide what to do.
// The 'message' that is returned is put to lower-case in msg,
// and msg is then handled via the parseCommand() function.
client.on('message', message => {
  const msg = message.content.toLowerCase();

  if (msg.author === client.user) {
    return -1;
  }

  if (msg.startsWith(prefix)) {
    return parseCommand(message);
  }
});

client.login(token);
