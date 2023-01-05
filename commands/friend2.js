const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('franco')
        .setDescription('Responde quien es franco'),
    async execute(interaction){
        await interaction.reply( {content: 'Un gordito que se cree que tiene buenos gustos', ephemeral: true} );
    },
}