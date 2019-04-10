//Our custom commands

module.exports = {
    name: 'create',
    description: 'Creates a command',
    args: true,
    minArgs: 2,
    guildOnly: true,
    usage: '<topic> <resourcelink>',
    execute(message, args){
        message.channel.send(args);
    }
}