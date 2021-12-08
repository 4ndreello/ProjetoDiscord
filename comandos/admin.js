const Users = require('../database/models/userSchema.js');

module.exports = {
	name: 'admin',
	description: 'Descricao do pin',
	async execute(message, args, client, Discord) {    
    var mentionedMember = message.mentions.members.first() == undefined ? client.users.cache.get(args[1]) : message.mentions.members.first().user;
    if(!mentionedMember) return message.channel.send("Informe o usuario")
    let usuario = await Users.findOne({
        userID: mentionedMember.id
    });
    
    if(!usuario) return message.channel.send("Esse usuario nao existe.")
    var pin_ativo = usuario.pin_ativo == true ? "Sim" : "Não";
    const adminEmbed = new Discord.MessageEmbed()
    .setAuthor(mentionedMember.username, mentionedMember.displayAvatarURL())
    .setDescription(`Pins gerados: \`${usuario.pins_gen}\`\nPegou por ultimo: \`${usuario.pego_por_ultimo}\`\nPin ativo: \`${pin_ativo}\``)
    .setTimestamp();
    message.channel.send(adminEmbed);
	},
};