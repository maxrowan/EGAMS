exports.up = function ( knex ) {
	return knex.schema.table( 'users', ( t ) => {
		t.boolean( 'suspended' ).notNull().defaultTo( false );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.table( 'users', ( t ) => {
		t.dropColumn( 'suspended' );
	} );
};