let express = require( 'express' );
let router = express.Router();
let store = require( '../private/store' );

/**
 * GET login page
 */
router.get( '/login', ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/login.js' } ];
	res.render( 'login', { title: 'Log In', scripts: scripts, styles: styles } );
} );

router.post( '/login', ( req, res ) => {
	store.authenticate( {
			email: req.body.email,
			password: req.body.password
		} )
		.then( ( { success } ) => {
			(success ? res.sendStatus( 200 ) : res.sendStatus( 401 ));
		} );
} );


/**
 * GET signup page.
 */
router.get( '/', ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/signup.js' } ];
	res.render( 'signup', { title: 'Sign Up', scripts: scripts, styles: styles } );
} );

router.post( '/signup', ( req, res ) => {
	store.signup( {
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			address: req.body.address
		} )
		.then( () => res.sendStatus( 200 ) );
} );


module.exports = router;