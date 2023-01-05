const setupSchema = require('./models/setups');
const Discord = require('discord.js');
const { Welcome } = require('niby-welcomes');

module.exports = client => {
    client.on("guildMemberAdd", async member => {
        try {
            const { guild } = member;

            let setupData = await setupSchema.findOne({ guildId: guild.id });
            if (!setupData) return;

            let canalBienvenida = guild.channels.cache.get(setupData?.bienvenidas?.canal);
            if (!canalBienvenida) return;
            let imagenBienvenida = await new Welcome()
                .setWelcomeMessage("Bienvenido")
                .setUsername(member.user.tag, /*OPCIONAL*/ { color: "#ffffff" })
                .setMemberCount(`Sos el número #${member.guild.memberCount}`, /*OPCIONAL*/ { color: "#ffffff" })
                .setAvatar(member.user.displayAvatarURL({size: 512, extension: "png"}))
                .setBackgroundUrl(setupData?.bienvenidas?.fondo, /*OPCIONAL*/ { opacity: 0.8 })
                .setBorder(true, /*OPCIONAL*/ { color: "#ffffff", size: 15 })
                .setStyle("koya") //koya, mee6
                .build();

            let attachment = new Discord.AttachmentBuilder(imagenBienvenida, {name: `bienvenida-${member.user.tag}.png`});

            canalBienvenida.send({content: `${setupData?.bienvenidas.mensaje.replace(/{usuario}/, member).replace(/{servidor}/,
                 guild.name)}`, files: [attachment]
                }).catch( () => {});

        } catch (e) {
            console.log(e);
        }
    })
}