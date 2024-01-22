const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const fs = require('node:fs');
const path = require('node:path');

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: '10',
}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Resetando ${commands.length} comandos...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      {body: commands}
    );

    console.log('Comandos registrados com sucesso!');
  } catch (error) { 
    console.error(error)
  }
})();