module.exports = async (client) => {

    client.on('ready', async () => {

        console.log(` _____________________________________________`)
        console.log('|                                             |')
        console.log(`| Olá, estou online com atualmente ${client.commands.size} comandos |`)
        console.log(`|_____________________________________________|`)

    })

}