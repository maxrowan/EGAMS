exports.up = function ( knex ) {
	return knex.schema.table( 'payments', ( t ) => {
		t.boolean( 'paid' ).notNull().defaultTo( false );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.table( 'payments', ( t ) => {
		t.dropColumn( 'paid' );
	} );
};