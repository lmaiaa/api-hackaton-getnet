
exports.up = function(knex) {
    return knex.schema.createTable('proposals_interest', function(table) {
        table.increments('id').primary();
        table.integer('number').notNullable();
        table.decimal('interest').notNullable();
        table.integer('proposal_id').notNullable();

        table.foreign('proposal_id').references('id').inTable('proposals');
    })
};

exports.down = function(knex) {
  
};
