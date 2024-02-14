const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-bot')
    .setDescription('Mostra as informações do bot!'),
    
    async execute(interaction) {
      const bot = JSON.parse(process.env.INFO_BOT);
  
      await interaction.reply(`
        Essas são as informações do seu bot:
        Título: ${bot.title},
        ID: ${bot._id},
        ID da Organização: ${bot.organizationId},
        ID da Empresa: ${bot.companyId}
      `);
    }
}