const connection = require('../database/connection');
const crypto     = require('crypto');
const bcrypt     = require('bcryptjs');

  module.exports = {
    async register(req, res){
        const { email, password } = req.body;
        try{

            const users = await connection('users')
            .where('email', email)
            .select('*')
            .first();

            if (users) {
                return res.status(400).json({ error : 'Usuario já existente'});
            }

            if (email=="") {
                return res.status(400).json({ error : 'Para cadastro é necessário preencher o e-mail!'});
            }

            const id = crypto.randomBytes(10).toString('HEX');
            const hash = password;

            await connection('users').insert([{id:id, email:email, password:hash}]);

            return res.send({ id });

        } catch (err){
            return res.status(400).json({error: 'Falha no registxxro'});
        }
    },
    async list(req, res){
        const users = await connection('users').select('*');
        return response.json( users );
    },
    
    async signup(req, res){
        const { email, password } = req.body;
        
        const users = await connection('users')
        .where('email', email)
        .select('*')
        .first();

        if (!users) {
            return res.status(401).json({ error : 'Usario nao encontrado.'});
        }

        if (password !== users.password) {
            return res.status(401).json({ error : 'Senha invalida.'});
        }
 
        return res.status(200).json({id: users.id});

    }
};