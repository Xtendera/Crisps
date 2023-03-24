const { Client, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
] });

const listenChannel = '1088654010870931527';
let number = 1;

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
	if (message.channelId != listenChannel) return;
	if (message.author.bot) return;

	if (message.content == number) {
		message.react('✅');
		number++;
	}
	else {
		number = 1;
		message.reply('Wrong number! Next number is **1**');
	}
});

client.login(token);