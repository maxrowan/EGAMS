exports.up = function ( knex ) {
	return knex.schema.table( 'payments', ( t ) => {
		t.boolean( 'disputed' ).notNull().defaultTo( false );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.table( 'payments', ( t ) => {
		t.dropColumn( 'disputed' );
	} );
};