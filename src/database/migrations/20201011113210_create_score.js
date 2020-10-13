
exports.up = function(knex) {
    return knex.schema.createTable('scores', function(table) {
        table.increments('id').primary();
        table.integer('recency').notNullable();
        table.integer('frequency').notNullable();
        table.decimal('monetary').notNullable();
        table.integer('recency_quartile').notNullable();
        table.integer('frequency_quartile').notNullable();
        table.integer('monetary_quartile').notNullable();
        table.integer('score').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.integer('client_id').notNullable();

        table.foreign('client_id').references('id').inTable('clients');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('scores');
};
