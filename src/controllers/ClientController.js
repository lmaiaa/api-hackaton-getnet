const connection = require('../database/connection');

module.exports = {

    async index (req, res) {
        const clients = await connection('clients').select('*');
        return res.json( clients );
    },
    async create(req, res){
        const { name, type, city, uf, user_id, limit} = req.body;
        try{
            const client = await connection('clients')
            .where('user_id', user_id)
            .select('*')
            .first();

            if (client) {
                return res.status(400).json({ error : 'Cliente ja existente'});
            }

            const users = await connection('users')
            .where('id', user_id)
            .select('*')
            .first();

            if (!users) {
                return res.status(401).json({ error : 'Usario nao encontrado.'});
            }

            await connection('clients').insert({name, type, city, uf, user_id, limit});

            return res.json( "ok" );

        } catch (err){
            return res.status(400).json({error: 'Falha no registro do cliente'});
        }
    },
    async findByUser(req, res){
        const  user_id = req.headers.authorization;
        const clients = await connection('clients')
            .where('user_id', user_id)
            .select('*');

        return res.json( clients );
    
    },
    async delete(req, res){
        const  id = req.headers.authorization;
        await connection('clients').where('user_id', id).delete();

        return res.status(204).send("Cliente apagado!");
    },
};
