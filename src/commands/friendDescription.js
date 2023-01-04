const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('')
        .setDescription('Replies who are the cool people in the server'),
    async execute(interaction){
        await interaction.reply('We dont have :(!');
    },
}