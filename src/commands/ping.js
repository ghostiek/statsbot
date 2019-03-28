module.exports = {
    name: 'ping',
    description: 'ping',
    execute(message, args){
        if (message.member.hasPermission(checkAdmin = true)){
            message.channel.send('Pong Admin');
        } else{
            message.channel.send('Pong');
        }

    }
}