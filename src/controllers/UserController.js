const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const users = await connection('users').select('*');
        return res.json( users );
    },
    async delete(req, res){
        const  id = req.headers.authorization;
        await connection('users').where('id', id).delete();

        return res.status(204).json("Usuario apagado!");
    },
};