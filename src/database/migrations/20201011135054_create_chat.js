
exports.up = function(knex) {
    return knex.schema.createTable('chats', function(table) {
        table.increments('id').primary();
        table.integer('originator_id').notNullable();
        table.integer('receiver_id').notNullable();
        table.string('message').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

        table.foreign('originator_id').references('id').inTable('clients');
        table.foreign('receiver_id').references('id').inTable('clients');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chats');
};
