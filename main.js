const Discord = require("discord.js")
const client = new Discord.Client()

PREFIX = "!!"
CHANNEL_ID = "803026733019562014"

let annoyed

let messages = [
	{ text: "IT'S FUCKING RAW!!!!", gif: "https://tenor.com/view/ramsay-raw-gif-13771788" },
	{ text: "YOU DOUGHNUT!", gif: "https://tenor.com/view/gordon-ramsay-doughnut-donut-gif-9736843" },
	{ text: "IDIOT SANDWICH", gif: "https://media0.giphy.com/media/zKOqnQprdq2gU/giphy.gif" },
]

client.login("ODAzMDE3Njc0NDM5MTMxMTU2.YA3qfA.CU8yduifWNZCM97jmRbiwgVTkho")

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (message) => {
	if (message.author.bot) return

	if (message.channel.id === CHANNEL_ID) {
		if (!message.content.startsWith(PREFIX)) {
			if (annoyed === null) {
				message.channel.send(`Set the person to annoy with ${PREFIX}annoy @Person`)
			} else if (message.attachments.size > 0) {
				let i = Math.floor(Math.random() * messages.length)
				message.channel.send(`<@${annoyed.id}>` + " " + messages[i].text + "\n" + messages[i].gif)
			}
		}

		let args = message.content.split(" ")
		let command = args[0].substr(PREFIX.length)

		if (command === "help") {
			message.channel.send(`${PREFIX}annoy @Person`)
		}

		if (command === "annoy") {
			if (args.length === 1) {
				message.channel.send(`Who to annoy? (${PREFIX}annoy @Person)`)
			}
			if (args.length === 2) {
				annoyed = getUserFromMention(args[1])
				client.user.setPresence({ activity: { name: `annoy ${annoyed.username}!` }, status: "online" })
				message.channel.send("Person to annoy set!")
			}
		}

		if (command === "stop") {
			annoyed = null
			client.user.setPresence({
				activity: { name: "Hell's Kitchen", type: "WATCHING", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
				status: "idle",
			})
			message.channel.send("Stopped being Ramsay.")
		}
	}
})

function getUserFromMention(mention) {
	if (!mention) return

	if (mention.startsWith("<@") && mention.endsWith(">")) {
		mention = mention.slice(2, -1)

		if (mention.startsWith("!")) {
			mention = mention.slice(1)
		}

		return client.users.cache.get(mention)
	}
}
