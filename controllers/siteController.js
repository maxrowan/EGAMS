let ex = module.exports = {};
let store = require( '../private/store' );

/**
 * display homepage
 */
ex.get_homepage = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/homepage.js' } ];
	res.render( 'homepage', { title: 'Home', scripts: scripts, styles: styles } );
};

/**
 * profile
 */
ex.get_profile = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/profile.js' } ];
	res.render( 'profile', { title: 'Home', scripts: scripts, styles: styles } );
};

/**
 * payments
 */
ex.get_payments = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/payments.js' } ];
	res.render( 'payments', { title: 'Home', scripts: scripts, styles: styles } );
};
ex.post_payments = ( req, res ) => {
	store.getPayments( {
			email: req.body.email
		} )
		.then( () => {
			res.sendStatus( 200 );
		} );
};

/**
 * pickup
 */
ex.get_pickup = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/pickup.js' } ];
	res.render( 'pickup', { title: 'Home', scripts: scripts, styles: styles } );
};

/**
 * feedback
 */
ex.get_feedback = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/feedback.js' } ];
	res.render( 'feedback', { title: 'Home', scripts: scripts, styles: styles } );
};
ex.post_feedback = ( req, res ) => {
	store.submitFeedback( {
			email: req.body.email,
			subject: req.body.subject,
			message: req.body.message
		} )
		.then( () => {
			res.sendStatus( 200 );
		} );
};