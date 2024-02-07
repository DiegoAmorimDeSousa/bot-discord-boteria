const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-bot')
    .setDescription('Solicita o id do bot!')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Query para o bot')
        .setRequired(false) 
    ),
    
    async execute(interaction) {
      const query = interaction.options.getString('query'); 

      process.env.BOT_ID = interaction.options.getString('query') || '';
  
      if (query) {
        await interaction.reply(`O bot com id ${query} já ira iniciar a conversa`);
      } 
    }
}