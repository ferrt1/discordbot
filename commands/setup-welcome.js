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
                .setRequired(true)),

    async execute(interaction) {

        let setupProfile = await Setup.findOne({ guildId: interaction.guild.id });
    
        let canalBienvenida = interaction.options.getString('canal');

        console.log(canalBienvenida);

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
                guildId: interaction.guild.id,
                bienvenidas: {
                    canal: canalBienvenida, fondo: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/11/05/4212036423.jpg', mensaje: "Bienvenido {usuario}, pasala bien!"
                },
            });

            await setupProfile.save().catch(console.error);
            await interaction.reply({embeds: [ embedWelcomeAccept ]});

            console.log(setupProfile);
            
        } else {
            if(canalBienvenida != setupProfile.bienvenidas.canal){
                setupProfile.update({
                    bienvenidas:{
                        canal : canalBienvenida
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