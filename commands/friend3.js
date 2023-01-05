const { SlashCommandBuilder } = require("discord.js");

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('santi')
        .setDescription('Responde quien es santi'),
    async execute(interaction){
        await interaction.reply( {content: 'El novio de todo el server pero shhh no le digas que se enoja', ephemeral: true} );
    },
}