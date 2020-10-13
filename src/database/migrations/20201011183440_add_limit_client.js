
exports.up = function(knex) {
    return knex.schema.table('clients', function(table) {
        table.decimal('limit').notNull().defaultTo(0.0);
    });
};

exports.down = function(knex) {
    return knex.schema.table('clients', function(table) {
        table.dropColumn('limit');
    });
};
