const { SlashCommandBuilder } = require("discord.js");


module.exports = { 
    data: new SlashCommandBuilder()
        .setName('owners')
        .setDescription('Replies who is the owner of the server!'),
    async execute(interaction){
        await interaction.reply( {content: 'The owners of the server is <@409912503200645130> and <@415199906920267787>'});
    },
}