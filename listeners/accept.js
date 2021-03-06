module.exports = (bot) => {
    bot.on("accept", (message, content) => {
        var args = bot.split(content);
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply("You do not have permission accept suggestions");
        } else {
            if (args[0].length < 1) {
                return message.reply("Usage: `"+bot.config.prefix+"accept {message ID} {response}`");
            }
            staffresponse = content.slice(args[0].length);
            console.log(args[0]);
            bot.client.channels.cache.get(bot.config.channels.suggestions).messages.fetch(args[0])
                .then(function(message) {
                    var messageData = JSON.parse(JSON.stringify(message.embeds[0]));
                    const suggestionEmbed = new bot.Embed()
                        .setColor('#75ed0c')
                        .setDescription("" + messageData.description + "")
                        .setTimestamp(messageData.createdTimestamp)
                        .setFooter("Lost Lands (Accepted)");
                    if (staffresponse) {
                        console.log("Response: "+staffresponse);
                        suggestionEmbed.addField("Staff Response", staffresponse);
                    }
                    if (messageData.author.icon_url !== null) {
                        suggestionEmbed.setAuthor(messageData.author.name, messageData.author.icon_url);
                    } else {
                        suggestionEmbed.setAuthor(messageData.author.name);
                    }
    
                    message.edit(suggestionEmbed);
                }).catch((err) => {
                    console.error(err);
                    return message.channel.send("Could not accept, error: "+err);
                });
                return message.reply("Accepted suggestion.");
        }
    });
}