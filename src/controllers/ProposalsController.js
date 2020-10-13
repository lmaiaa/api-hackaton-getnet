const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const proposals = await connection('proposals').select('*');
        return res.json( proposals );
    },
    async create(req, res){
        const { active, status, num_instalments, client_id} = req.body;
        await connection('proposals').insert({active, status, num_instalments, client_id});

        return res.json( "ok" );
    },
    async findByClient(req, res){
        const { client_id }  = request.params;
        const proposals = await connection('proposals')
            .where('client_id', client_id)
            .select('*');

        return res.json( proposals );
    }
};