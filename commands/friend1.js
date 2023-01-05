const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('serpi')
        .setDescription('Responde quien es serpi'),
    async execute(interaction){
        await interaction.reply( {content: 'Mendocino que nos cambia por la mujer', ephemeral: true} );
    },
}