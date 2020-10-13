const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const proposals = await connection('proposals_interest').select('*');
        return res.json( proposals );
    },
    async create(req, res){
        const { number, interest, proposal_id} = req.body;
        await connection('proposals_interest').insert({number, interest, proposal_id});

        return res.json( "ok" );
    },
    async findByProposalId(req, res){
        const { proposal_id }  = request.params;
        const proposals = await connection('proposals_interest')
            .where('proposal_id', proposal_id)
            .select('*');

        return res.json( proposals );
    }
};

