let ex = module.exports = {};

const crypto = require( 'crypto' );
const knex = require( 'knex' )( require( './knexfile' ) );

function signup( { email, password, first_name, last_name, address } ) {
	let { salt, hash } = saltHashPassword( { password } );
	console.log( `Add User with:\n\temail: ${email}\n\tpassword: ${hash}\n\tfirst name: ${first_name}\n\tlast name: ${last_name}\n\taddress: ${address}` );
	return knex( 'users' ).insert( {
		email,
		salt,
		hashed_password: hash,
		first_name,
		last_name,
		address
	} );
}

function authenticate( { email, password } ) {
	console.log( `Authenticating User:\n\tEmail: ${email}\n` );
	return knex( 'users' ).where( { email } )
		.then( ( [ users ] ) => {
			if ( !users ) return { success: false };
			let { hash } = saltHashPassword( {
				password,
				salt: users.salt
			} );
			return { success: hash === users.hashed_password }
		} );
}

function saltHashPassword( { password, salt = randomString() } ) {
	let hash = crypto.createHmac( 'sha512', salt ).update( password );

	return {
		salt,
		hash: hash.digest( 'hex' )
	}
}

function randomString() {
	return crypto.randomBytes( 4 ).toString( 'hex' );
}

ex.signup = signup;
ex.authenticate = authenticate;
ex.saltHashPassword = saltHashPassword;
