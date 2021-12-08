const Discord = require('discord.js');
module.exports = {
  name: "message",
  async execute(message, client) {
    if (message.author.bot == true) return;
    if (message.channel.type == "dm") return;
    if (!message.content.slice(2).trim().split(/ +/)) return;

    const args = message.content
      .slice(2)
      .trim()
      .split(/ +/);
    
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;
    if(!message.guild.channels.cache.find(channel => channel.name === `${message.author.id}`)){

      message.guild.channels.create(`${message.author.id}`, {
          type: 'text',
          permissionOverwrites: [
              {
                  id: message.guild.id,
                  deny: 'VIEW_CHANNEL'
              },
              {
                  id: message.author.id,
                  allow: 'VIEW_CHANNEL'
              }
          ],
      }).then(canal => {

          let category = message.guild.channels.cache.find(c => c.id == "869386702681174046" && c.type == "category");          
          //canal.setParent(category);
          let channelEmbed = new Discord.MessageEmbed()
          .setTitle("HaumeaScanner")
          .setDescription("Yay! Your channel was successfully created, you can do your commands here now.")
          .setTimestamp();  
          canal.send(`${message.author}`, { embed: channelEmbed });
      });
      message.delete();
      return;      
  }

  if(message.channel.name !==  `${message.author.id}`) return message.delete();
  
    try {
      client.commands.get(command).execute(message, args, client, Discord);
    } catch (error) {
      console.error(error);
      message.reply("aconteceu um problema ao executar esse comando!");
    }
  }
};
