
exports.up = function(knex) {
    return knex.schema.createTable('clients', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();

        table.integer('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};
