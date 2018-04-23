exports.up = function ( knex ) {
	return knex.schema.createTable( 'feedback', ( t ) => {
		t.increments( 'id' ).primary();
		t.string( 'email' ).notNullable();
		t.string( 'subject' );
		t.string( 'message' ).notNullable();
		t.timestamps( false, true );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.dropTableIfExists( 'feedback' );
};