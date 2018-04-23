
exports.up = function(knex, Promise) {
  return knex.schema.table( 'users', ( t ) => {
  	t.string( 'pickup_time' ).notNull().defaultTo( 'Monday 8:00am' );
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table( 'users', ( t ) => {
  	t.dropColumn( 'pickup_time' );
  })
};
