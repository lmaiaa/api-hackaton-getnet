const connection = require('../database/connection');

module.exports = {
    async list(req, res){
        const chat = await connection('chats').select('*');
        return res.json( chat );
    },
    async sendMessage(req, res){
        const { originator_id, receiver_id, message } = req.body;
        try{

            await connection('chats').insert({originator_id, receiver_id, message});

            return res.status(200).json("ok");

        } catch (err){
            return res.status(400).json({error: 'Falha no registro da mensagem.'});
        }
    },
    async getMessage(req, res){

        const  originator_id = req.headers.authorization;
        
        const msg = await connection('chats')
        .where('originator_id', originator_id)
        .select('*')
        .first();

        if (!msg) {
            return res.status(401).json({ error : 'Nenhuma mensagem encontrada.'});
        }
 
        return res.status(200).send(msg);

    }
};
