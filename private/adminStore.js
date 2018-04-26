let ex = module.exports = {};

const crypto = require( 'crypto' );
const knex = require( 'knex' )( require( './knexfile' ) );

function createAccount( { email, password, first_name, last_name } ) {

	// make sure user with this email isn't in the db already
	return knex( 'admins' ).where( { email: email } )
		.then( ( users ) => {
			if ( users.length > 0 ) {
				return false;
			}

			// add to DB
			let { salt, hash } = saltHashPassword( { password } );
			console.log( `Create Acmin with:\n\temail: ${email}\n\tpassword: ${hash}\n\tfirst name: ${first_name}\n\tlast name: ${last_name}` ); //TODO: remove
			return knex( 'admins' ).insert( {
					email: email,
					salt: salt,
					hashed_password: hash,
					first_name: first_name,
					last_name: last_name
				} )
				.then( () => {
					return true;
				} );
		} );
}

function authenticate( { email, password } ) {
	console.log( `Authenticating Admin:\n\tEmail: ${email}\n\tPassword: ${password}` );
	return knex( 'admins' ).where( { email } )
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
	};
}

function randomString() {
	return crypto.randomBytes( 4 ).toString( 'hex' );
}

function findUser( { email, payments } ) {

	if ( payments === 'true' ) {
		if ( email === '' ) {
			return knex( 'users' )
				.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
				.where( { paid: false } )
				.select( 'email' )
				.distinct( 'email' );
		} else {
			return knex( 'users' ).where( { email } )
				.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
				.where( { paid: false } )
				.select( 'email' )
				.distinct( 'email' );
		}
	} else {
		if ( email === '' ) {
			return knex( 'users' )
				.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
				.select( 'email' )
				.distinct( 'email' );
		} else {
			return knex( 'users' ).where( { email } )
				.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
				.select( 'email' )
				.distinct( 'email' );
		}
	}
}

function getUserInfo( { email } ) {
	return knex( 'users' ).where( { email } )
		.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
		.select( 'first_name', 'last_name', 'email', 'address', 'pickup_time', 'suspended', 'amount_due', 'paid', 'payment_for', 'disputed' );
}

function suspend( { email, suspend } ) {
	let suspendInt = ( suspend === 'true' ? 1 : 0 );

	return knex( 'users' ).where( { email: email } )
		.update( { suspended: suspendInt } );
}

function getDisputes() {
	return knex( 'users' )
		.leftJoin( 'payments', { 'users.id': 'payments.user_id' } )
		.where( { disputed: true } )
		.select( 'email' )
		.distinct( 'email' );
}

function getFeedback() {
	return knex( 'feedback' )
		.select( 'email', 'message', 'subject' );
}

ex.authenticate = authenticate;
ex.createAccount = createAccount;
ex.findUser = findUser;
ex.getUserInfo = getUserInfo;
ex.suspend = suspend;
ex.getDisputes = getDisputes;
ex.getFeedback = getFeedback;