const { Client, Events, GatewayIntentBits } = require('discord.js');

const { token } = require('./config.json');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
] });

const listenChannel = '1088654010870931527';
let prevUser = '';
let number = 1;

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
	if (message.channelId != listenChannel) return;
	if (message.author.bot) return;

	if (message.author.id == prevUser) {
		number = 1;
		prevUser = '';
		message.reply('Same person cannot count twice! Next number is **1**');
		return;
	}

	if (message.content == number) {
		prevUser = message.author.id;
		message.react('✅');
		number++;
	}
	else {
		number = 1;
		prevUser = '';
		message.reply('Wrong number! Next number is **1**');
	}
});

client.login(token);