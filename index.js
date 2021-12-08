console.log("\n[+] Loading...");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const mongoose = require('./database/mongoose.js');
client.commands = new Discord.Collection();
require("dotenv").config();

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

mongoose.init();
client.login('ODUwNDM1MDQyODgyMDkzMDc2.YLprWg.XF_nVe4ZktJhOr4bdilHujI9nmQ');