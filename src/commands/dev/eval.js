const Discord = require('discord.js')

module.exports = {
    name: 'eval',
    aliases: ['eval', 'cmd', 'console', 'terminal'],
    run: async(client, message, args) => {

        if(message.author.id != 414984935489667072) return;

        const codigo = args.slice(0).join(" ")
        if(!codigo) return message.reply('Insira o que deseja que eu rode.')

        try {

            var resultado = eval(codigo)

            if(typeof resultado !== "string") resultado = inspect(resultado)
            if(resultado.size > 950) resultado = resultado.substr(0, 950)

            var embed = {
                title: '📪 ⋅ Terminal',
                description: `**Código \`\`\`${codigo}\`\`\`**Resultado**\`\`\`${resultado}\`\`\``,
                color: "AQUA"
            }
            message.reply({ embed: embed })

        } catch (err) {

            var embed = {
                title: '📪 ⋅ Terminal',
                description: `**Código \`\`\`${codigo}\`\`\`**Resultado**\`\`\`${resultado}\`\`\``,
                color: "AQUA"
            }
            message.reply({ embed: embed })
            
        }

    }
}