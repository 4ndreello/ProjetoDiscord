const Info = require("../database/models/pinSchema.js");
const fetch = require('node-fetch');

module.exports = {
    name: "scans",
    description: "Scanner event",
    async execute(message, args, client, Discord) {

        let usuario = await Info.find({
            userID: message.author.id
        });

        if (args[0]) {
            const usuario = await Info.findOne({
                pin: args[0]
            });
            if (!usuario || usuario.expired == true) return message.channel.send("This pin doesnt exist");
            if (usuario.userID !== message.author.id) return message.channel.send("This pin doesnt exist");
            var f = `- ${usuario.found}`;
            var emoji = "<:fail:866801163708661760>";

            if (!(usuario.found)) {
                console.log(usuario);
                const respEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setDescription(`\`SCAN #${args[0]}\` <:eye_found:861666704652107826>\n\n\`Scan not finished yet\``)
                message.channel.send(respEmbed);
                return;
            }

            if (usuario.found === "nothing_found") {
                f = "Nothing found";
                emoji = "<:concluido:866801151802343485>";
            } else {
                f = f.replace(/,/g, "\n- ");
            }

            if (!(usuario.proc === null)) {
                let a = usuario.proc;
                a = a.replace(/~/g, "\n");

                f += `\n\n- [ALERT] - \nRestarted Processes:\n${a}`;
            }
            var pais = "";
            fetch(`http://ip-api.com/json/${usuario.location}`)
                .then(res => res.json())
                .then(json => {
                    const respEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setDescription(`\`SCAN #${args[0]}\` <:logo_haumearemovebgpreview:866800351596118026>\n\n<:elapsed:862198606551318528> **Scan Speed**: ${usuario.elapsed}\n<:pessoa:862198993474945046> **Computer Name**: ${usuario.pc}\n<:alts:862198606420246548> **Alts**: ${usuario.alts}\n<:lixo:866800797554835517> **Recycle Bin**: ${usuario.bin}\n🗺️ **Location**: ${json['country']}\n\n${emoji}\`\`\`diff\n${f}\`\`\``)
                        .setFooter("© 2021 Haumea")
                    message.channel.send(respEmbed);
                });
            return;
        }

        var cu = "No recent scans...";
        if (usuario.length !== 0) {
            cu = "";
            for (i = 0; i < usuario.length; i++) {
                if (usuario[i].expired == true) {
                    cu += `${usuario[i].pin} ― Expired\n`;
                    continue;
                }
                if (!(usuario[i].pc)) {
                    cu += `${usuario[i].pin} ― Not used\n`;
                    continue;
                }
                if (i == usuario.length - 1) {
                    cu += `${usuario[i].pin} ― Complete [${usuario[i].horario}]`;
                    break;
                }

                cu += `${usuario[i].pin} ― Complete [${usuario[i].horario}]\n`;

            }
        }
        const scansEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`Old scans:\n\`\`\`${cu}\`\`\``)
        message.channel.send(scansEmbed);



    }
};