import {Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log('O bot está online')
});

client.on('messageCreate', (message) => {
  console.log('message', message)
  if(message.content === 'Ola'){
    message.reply({
      content: 'Hello World'
    })
  }
})

client.login(process.env.TOKEN_BOT);