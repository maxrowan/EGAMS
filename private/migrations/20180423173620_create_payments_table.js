exports.up = function ( knex ) {
	return knex.schema.createTable( 'payments', ( t ) => {
		t.increments( 'id' ).primary();
		t.string( 'user_id' ).notNullable();
		t.string( 'payment_for' ).notNullable();
		t.float( 'amount_due' ).notNullable();
		t.timestamps( false, true );
	} );
};

exports.down = function ( knex ) {
	return knex.schema.dropTableIfExists( 'payments' );
};