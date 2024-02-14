const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

for (const file of commandsFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  if('data' in command && 'execute' in command){
    client.commands.set(command.data.name, command);
  } else {
    console.log(`Esse comando em ${filePath} está com data ou execute faltando`)
  }
}

client.once(Events.ClientReady, c => {
  console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if(!command) {
    console.error('Comando não encontrado');
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Houve um erro ao executar esse comando!');
  }
});

let oldIds = [];
let criouSessao = false;
let sessionId = '';
let sessionRedisKey = '';

// id bot: 65c15f3cf9841f026520d056

client.on(Events.MessageCreate, async (messageBot) => {
  let subscribe;
  if(!criouSessao) {
    subscribe = await startNewSession(process.env.BOT_ID);
    sessionId = subscribe.sessionId;
    sessionRedisKey = subscribe.sessionRedisKey;
  } else if(!messageBot.author.bot){
    await sendMessage(sessionId, messageBot.content, process.env.BOT_ID);
  }

  setInterval(async () => {
    const sessionMessages = await getMessage(sessionRedisKey);

    if(sessionMessages.arrayMessages.length > 0){
      sessionMessages.arrayMessages.map(message => {
        if(!oldIds.includes(message._id)){
          messageBot.reply(message.message);
          oldIds.push(message._id);
        }
      })
    }
  }, 4000);
});

const startNewSession = async (botId) => {
  criouSessao = true;
  const response = await axios.post(`http://localhost:3334/webchat/subscribe`, {
    sessionId: '',
    botId: botId,
    socketId: '',
    isPreview: true,
    channel: 'webchat',
    contactNumber: 'phone',
    message: '',
  });

  return response.data;
};

const getMessage = async (sessionId) => {
  const messages = await axios.post(`http://localhost:3334/session`, {
      sessionId: sessionId
    });

  process.env.INFO_BOT = JSON.stringify(messages.data.bot);

  return messages.data.session;
}

const sendMessage = async (sessionId, message, botId) => {
  const response = await axios.post(`http://localhost:3334/webchat/message`, {
    sessionId: sessionId,
    botId: botId,
    isPreview: true,
    channel: 'webchat',
    message: message,
  });
  return response.data;
};