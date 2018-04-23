exports.up = function ( knex ) {
	return knex.schema.createTable( 'admins', ( t ) => {
		t.increments( 'id' ).primary();
		t.string( 'first_name' ).notNullable();
		t.string( 'last_name' ).notNullable();
		t.string( 'email' ).notNullable();
		t.string( 'salt' ).notNullable();
		t.string( 'hashed_password' ).notNullable();
		t.timestamps( false, true );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.dropTableIfExists( 'admins' );
};
