const Users = require("../database/models/userSchema.js");
const Info = require("../database/models/pinSchema.js");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

module.exports = {
  name: "pin",
  description: "Descricao do pin",
  async execute(message, args, client, Discord) {
    let horario = moment()
      .tz("America/Sao_Paulo")
      .format("L, HH:mm:ss");
    const pin_gen = Math.floor(Math.random() * (9999 - 1000) + 1000);
    const usuario = await Users.findOne({
      userID: message.author.id
    });

    if (!usuario) {
      await new Users({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        pin: null,
        pins_gen: 0,
      }).save();
      let chate = client.channels.cache.get('861774801319100416');
      let chatEmbede = new Discord.MessageEmbed()
            .setTitle(
              `${message.author.tag} [${message.author.id}]`,
              message.author.displayAvatarURL()
            )
            .setDescription(`O usuário ${message.author} [${message.author.id}] criou uma conta no bot`)
            .setFooter(`[C] HaumeaSecurity`);      

      chate.send(chatEmbede);

      let embedAuthor = new Discord.MessageEmbed()
      .setTitle(`Welcome ${message.author.username}!`)
      .setDescription("So you don't get lost, here are my commands: \n\n```\nShow your old scans [type h!scans {pin} to show information for that specific scan]\nh!pin ~ Generate your unique pin\n```")
      .setThumbnail("https://media.discordapp.net/attachments/861799987788120106/866779140135583744/0464815a073faasseab736670f8725f922.png");

      return message.channel.send(embedAuthor)
    }

    let pin_finder = await Info.findOne({
      pin: pin_gen
    });

    if (pin_finder) return message.channel.send("LOL?? CHAMA MEU ADMIN");
    let timeleft = usuario.timeout_cmd + 120000 - Date.now();
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    if (usuario.pin !== null) {
      return message.channel.send("You have an **open** pin");
    }

    if (timeleft > 0)
      return message.channel.send(
        `You need to wait \`${minutes} minutes and ${seconds} secs\``
    );
    
    const pinEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(
        `Your pin was generated with**success**!\nYou have exactly **1 minute** to use it.\n\`\`\`${pin_gen}\`\`\``
      )
      .setTimestamp();
    message.channel.send(pinEmbed).then(async msg => {
      await new Info({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        pin: pin_gen,
      }).save();
      
      await Users.updateOne(
        {
          userID: message.author.id
        },
        {
            pin: pin_gen,
            pego_por_ultimo: horario,
            timeout_cmd: Date.now(),
            expired: false,
            pin_ativo: true,
            $inc: {
              pins_gen: 1
            }
        },
      );

      msg.delete({ timeout: 60000 }).then(async () => {
        let u_pin = await Users.findOne({
          userID: message.author.id
        });
        if (u_pin.pin !== null) {
          await Users.updateOne(
            {
              userID: message.author.id
            },
            {
              $set: {
                pin: null,
                pego_por_ultimo: horario,
                timeout_cmd: Date.now()
              }
            }
          );

          await Info.updateOne(
            {
              pin: pin_gen
            },
            {
              expired: true,
            }
            );

          var chat = client.channels.cache.get('861774773867905034');
          var chatEmbed = new Discord.MessageEmbed()
            .setTitle(
              `${message.author.tag} [${message.author.id}]`,
              message.author.displayAvatarURL()
            )
            .setDescription(
              `O usuário excedeu o tempo de \`2 minutos\`.\n**PIN:** \`${pin_gen}\`\n**GEROU:** \`${u_pin.pins_gen} pins\`\n**HORARIO:** \`${u_pin.pego_por_ultimo}\``
            )
            .setFooter(`[C] HaumeaSecurity`)
          chat.send(chatEmbed);
        }
      });
    })
  }
};
