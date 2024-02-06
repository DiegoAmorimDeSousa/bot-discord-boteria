const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('get-bot')
    .setDescription('Solicita o id do bot!'),
    
  async execute(interaction) {
    await interaction.reply('Por favor informe o id do seu bot da seguinte forma: [{botId: id_do_seu_bot_aqui}] !');
  }
}