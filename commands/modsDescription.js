const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('friends')
        .setDescription('Replies who are the cool people in the server'),
    async execute(interaction){
        await interaction.reply('The mods of the server are <@38884312681244262> and <@329327832759271425>!');
    },
}