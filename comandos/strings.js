const Info = require("../database/models/pinSchema.js");
const fetch = require('node-fetch');

module.exports = {
    name: "strings",
    description: "Scanner event",
    async execute(message, args, client, Discord) {

        if (message.author.id !== "797110794843848736") return;

        let string = args.join(" ");

        fetch("https://api.haumea.club/penis.php?string="+string)
            .then(res => res.text())
            .then(text => {
            
                let strEmbed = new Discord.MessageEmbed()
                .setTitle("[Response from API]")
                .setDescription(`A string \`${string}\` foi encriptada com sucesso!\n\`\`\`Valor encriptado: ${text}\`\`\``)
                .setTimestamp()
                message.channel.send(`${message.author}`, {embed: strEmbed});
            
            });



    }
};