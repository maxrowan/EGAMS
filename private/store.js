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
	return knex( 'users' ).where( { email } )
		.then( ( [ users ] ) => {
			if ( !users ) return { success: false };
			let { hash } = saltHashPassword( {
				password,
				salt: users.salt
			} );

			let success = (hash === users.hashed_password && users.suspended === 0);

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

function getPayments( { email } ) {
	return knex( 'users' ).where( { email: email } )
		.then( ( [ user ] ) => {
			let user_id = user.id;

			return knex( 'payments' )
				.select( 'id', 'payment_for', 'amount_due', 'paid' )
				.where( { user_id: user_id } )
				.then( ( payments ) => {
					return payments;
				});
		} );
}

function makePayment( { id } ) {
	return knex( 'payments' ).where( { id: id } ).update( { paid: true } );
}

function disputePayment( { id } ) {
	return knex( 'payments' ).where( {id: id}).update( {disputed: true});
}

function submitFeedback( { email, subject, message } ) {
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
ex.makePayment = makePayment;
ex.disputePayment = disputePayment;
ex.submitFeedback = submitFeedback;
