
exports.up = function(knex) {
    return knex.schema.createTable('proposals', function(table) {
        table.increments('id').primary();
        table.string('active').notNullable();
        table.string('status').notNullable();
        table.timestamp('date_status').defaultTo(knex.fn.now());
        table.integer('num_instalments').notNullable();

        table.integer('client_id').notNullable();

        table.foreign('client_id').references('id').inTable('clients');
    })
};

exports.down = function(knex) {
  
};
