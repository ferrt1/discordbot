const { Client, Collection, Events, GatewayIntentBits, ActivityType, PresenceUpdateStatus } = require('discord.js');
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { connection, connect } = require('mongoose');
const welcome = require('./welcomes');

const client = new Client({ intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildVoiceStates
	],
	presence:{
		activities:[{name: process.env.STATUS, type:ActivityType[process.env.STATUS_TYPE]}],
        status: PresenceUpdateStatus.Online
	}
 });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events/client');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const eventsPathMongo = path.join(__dirname, 'events/mongo');
const eventFilesMongo = fs.readdirSync(eventsPathMongo).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of eventFilesMongo){
	const filePath = path.join(eventsPathMongo, file);
	const event = require(filePath);
	if (event.once) {
		connection.once(event.name, (...args) => event.execute(...args, client));
	} else {
		connection.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(process.env.TOKEN);

welcome(client);

(async () => {
	await connect(process.env.DATABASE_TOKEN).catch(console.error);
})();