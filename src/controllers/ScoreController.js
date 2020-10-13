const connection = require('../database/connection');

module.exports = {

    async index (req, res) {
        const scores = await connection('scores').select('*');
        return res.json( scores );
    },
    async create(req, res){
        const { name, type, city, uf, user_id } = req.body;
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

            await connection('clients').insert({name, type, city, uf, user_id});

            return res.json( "ok" );

        } catch (err){
            return res.status(400).json({error: 'Falha no registro do cliente'});
        }
    },
    async findByUser(req, res){
        const  user_id = req.headers.authorization;

        console.log(user_id);
        
        const clients = await  connection.select('*')
                .table('scores')
                .where('clients.user_id',user_id)
                .join('clients','clients.id','scores.client_id');

        return res.json( clients );
    
    },
};
