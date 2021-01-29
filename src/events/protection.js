const Discord = require('discord.js')

module.exports = (client) => {

    client.on('guildMemberRemove', async (membro) => {

        const registro = await membro.guild.fetchAuditLogs({ type: 'MEMBER_KICK', limit: 1 })
        const info = registro.entries.first()
    
        if(info) {
    
            var autorId = info.executor.id

            var userId = info.target.id
            var userNome = info.target.username
    
            if(membro.guild.ownerID === autorId) return;
            if(autorId === "759500722743541791") return;
    
            database.ref(`Servidores/${membro.guild.id}/Quantia/Expulsões/${autorId}`).once('value').then(async function (busca) {
    
                database.ref(`Servidores/${membro.guild.id}/Expulsões/${userId}`).set({
                    user: userId,
                    tag: userNome
                })
            
                if (busca.val() === null) {
            
                    database.ref(`Servidores/${membro.guild.id}/Quantia/Expulsões/${autorId}`).set({
                        quantia: 1
                    })
            
                    setTimeout(() => { 
            
                        database.ref(`Servidores/${membro.guild.id}/Quantia/Expulsões/${autorId}`).remove()
            
                    }, 1800000)
            
                } else {
            
                    database.ref(`Servidores/${membro.guild.id}/Quantia/Expulsões/${autorId}`).update({
                        quantia: busca.val().quantia + 1
                    })
            
                    if (busca.val().quantia > 4 || busca.val().quantia == 4) {
                        
                        membro.guild.members.ban(autorId, { reason: "MassKick Acusação" }).catch(err => {
            
                            return;
            
                        })
            
                    }
            
                }
        
            })
    
        } else {
    
            return;
            
        }
    
    
    })

    client.on('guildBanAdd', async (g) => {

        const registro = await g.fetchAuditLogs()
    
        var alvoNome = registro.entries.first().target.username
        var alvoId = registro.entries.first().target.id
    
        var autorNome = registro.entries.first().executor.username
        var autorId = registro.entries.first().executor.id
    
        if(g.ownerID === autorId) return;
        if(autorId === "759500722743541791") return;
    
        database.ref(`Servidores/${g.id}/Quantia/Banimentos/${autorId}`).once('value').then(async function (busca) {
    
            database.ref(`Servidores/${g.id}/Banimentos/${alvoId}`).set({
                user: alvoId,
                tag: alvoNome
            })
        
            if (busca.val() === null) {
        
                database.ref(`Servidores/${g.id}/Quantia/Banimentos/${autorId}`).set({
                    quantia: 1
                })
        
                setTimeout(() => { 
        
                    database.ref(`Servidores/${g.id}/Quantia/Banimentos/${autorId}`).remove()
        
                }, 1800000)
        
            } else {
        
                database.ref(`Servidores/${g.id}/Quantia/Banimentos/${autorId}`).update({
                    quantia: busca.val().quantia + 1
                })
        
                if (busca.val().quantia > 4 || busca.val().quantia == 4) {
                    
                    g.members.ban(autorId, { reason: "MassBan Acusação" }).catch(err => {
        
                        return;
        
                    })
        
                }
        
            }
    
        })
    
    })

}