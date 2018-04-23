let ex = module.exports = {};

const crypto = require( 'crypto' );
const knex = require( 'knex' )( require( './knexfile' ) );

function signup( { email, password, first_name, last_name, address } ) {

	// make sure user with this email isn't in the db already
	return knex( 'users' ).where( { email: email } )
		.then( ( users ) => {
			if ( users.length > 0 ) {
				return false;
			}

			// add to DB
			let { salt, hash } = saltHashPassword( { password } );
			console.log( `Add User with:\n\temail: ${email}\n\tpassword: ${hash}\n\tfirst name: ${first_name}\n\tlast name: ${last_name}\n\taddress: ${address}` );
			return knex( 'users' ).insert( {
					email: email,
					salt: salt,
					hashed_password: hash,
					first_name: first_name,
					last_name: last_name,
					address: address
				} )
				.then( () => {
					return true;
				} );
		} );
}

function updateUserInfo( { email, first_name, last_name, address } ) {
	return knex( 'users' )
		.where( { email: email } )
		.update( {
			first_name: first_name,
			last_name: last_name,
			email: email,
			address: address,
		} );
}

function authenticate( { email, password } ) {
	// TODO: Validate input?
	console.log( `Authenticating User:\n\tEmail: ${email}\n\tPassword: ${password}` );
	return knex( 'users' ).where( { email } )
		.then( ( [ users ] ) => {
			if ( !users ) return { success: false };
			let { hash } = saltHashPassword( {
				password,
				salt: users.salt
			} );

			let success = (hash === users.hashed_password);

			if ( success ) {
				return {
					success: true,
					first_name: users.first_name,
					last_name: users.last_name,
					email: users.email,
					address: users.address,
					pickup_time: users.pickup_time
				};
			} else {
				return { success: false };
			}
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

function getPayments( { email } ) {

	return knex( 'users' ).where( { email: email } )
		.then( ( users ) => {
			let user_id = users.id;

			return knex( 'payments' ).where( { user_id: user_id } );
		} );
}

function submitFeedback( { email, subject, message } ) {
	console.log( `Add Feedback with:\n\temail: ${email}\n\tSubject: ${subject}\n\tMessage: ${message}` );
	return knex( 'feedback' ).insert( {
		email: email,
		subject: subject,
		message: message
	} );
}

ex.signup = signup;
ex.authenticate = authenticate;
ex.updateUserInfo = updateUserInfo;
ex.saltHashPassword = saltHashPassword;
ex.getPayments = getPayments;
ex.submitFeedback = submitFeedback;
