const { SlashCommandBuilder, EmbedBuilder, DiscordAPIError } = require('discord.js');
const Setup = require('../models/setups')
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bienvenidas')
        .setDescription('Crea un canal para dar las bienvenidas')
        .setDefaultMemberPermissions(0)
        .addStringOption(option =>
            option
                .setName('canal')
                .setDescription('canal de bienvenidas')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('fondo')
                .setDescription('imagen para el canal de bienvenida')
                .setRequired(true)),

    async execute(interaction) {

        let setupProfile = await Setup.findOneAndUpdate({ guildId: interaction.guild.id });
        let canalBienvenida = interaction.options.getString('canal');
        let fondoBienvenida = interaction.options.getString('fondo');

        const embedWelcomeAccept = new EmbedBuilder()
            .setColor("#00800")
            .setTitle(`Se espicifico el canal de bienvenida! ${canalBienvenida}`)
        
        const embedCanalChange = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`Se actualizo el canal de bienvenidas ${canalBienvenida}`)
        
        const embedCanalEqual = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Este canal ya era de bienvenida!')


        if (!setupProfile) {
            setupProfile = await new Setup({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                bienvenidas: {
                    canal: canalBienvenida, fondo: fondoBienvenida, mensaje: "Bienvenido {usuario}, pasala bien!"
                },
            });

            await setupProfile.save().catch(console.error);
            await interaction.reply({embeds: [ embedWelcomeAccept ]});

            console.log(setupProfile);
            
        } else {
            if(canalBienvenida != setupProfile.bienvenidas.canal){
                await Setup.findOneAndUpdate( { guildId: interaction.guild.id}, {
                    bienvenidas: {
                    canal: canalBienvenida, 
                    fondo: fondoBienvenida, 
                    mensaje: "Bienvenido {usuario}, pasala bien!"
                    }
                })
                await interaction.reply({embeds: [ embedCanalChange ]});
            }
            else{
                await interaction.reply({embeds: [ embedCanalEqual ]});
            }
        }
    },
}