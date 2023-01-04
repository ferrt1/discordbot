const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('fernando')
        .setDescription('Replies who is the owner of the server!'),
    async execute(interaction){
        await interaction.reply('The owner of ther server is <@409912503200645130>');
    },
}