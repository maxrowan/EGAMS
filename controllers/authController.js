let ex = module.exports = {};
let store = require( '../private/store' );

/**
 * This file handles the requests and responses for the 'auth.js' route.
 *
 * When an endpoint call is issued over the web, auth.js sees what the call is for
 * and calls the corresponding function from this file
 */


/**
 * login functions
 */
ex.auth_login_get = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/login.js' } ];
	res.render( 'login', { title: 'Log In', scripts: scripts, styles: styles } );
};
ex.auth_login_post = ( req, res ) => {
	store.authenticate( {
			email: req.body.email,
			password: req.body.password
		} )
		.then( ( { success } ) => {
			(success ? res.sendStatus( 200 ) : res.sendStatus( 401 ));
		} );
};

/**
 * signup functions
 */
ex.auth_signup_get = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/signup.js' } ];
	res.render( 'signup', { title: 'Sign Up', scripts: scripts, styles: styles } );
};
ex.auth_signup_post = ( req, res ) => {
	store.signup( {
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			address: req.body.address
		} )
		.then( () => res.sendStatus( 200 ) );
};
