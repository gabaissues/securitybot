require('dotenv').config()

const { Client, Collection } = require('discord.js')
const client = new Client()

client.commands = new Collection()
client.aliases = new Collection()

const { Handler } = require('./src/functions/handler')
const { Events } = require('./src/functions/events')

Events(client)
Handler(client)

client.login(process.env.TOKEN)