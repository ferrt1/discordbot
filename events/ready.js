const { Events, ActivityType, PresenceUpdateStatus } = require('discord.js');
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        client.user.setActivity({
            name: "Excel",
            type: ActivityType.Watching,
        });
        PresenceUpdateStatus.Idle;
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};