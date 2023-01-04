const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('friends')
        .setDescription('Replies who are the cool people in the server'),
    async execute(interaction){
        await interaction.reply('The boyfriends <@388843126812442624> and <@329327832759271425>');
    },
}