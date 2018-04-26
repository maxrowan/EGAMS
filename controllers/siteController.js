let ex = module.exports = {};
let store = require( '../private/store' );

/**
 * display homepage
 */
ex.get_homepage = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/homepage.js' } ];
	res.render( 'user/homepage', { title: 'Home', scripts: scripts, styles: styles } );
};

/**
 * profile
 */
ex.get_profile = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/profile.js' } ];
	res.render( 'user/profile', { title: 'Profile', scripts: scripts, styles: styles } );
};

/**
 * payments
 */
ex.get_payments = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/payments.js' } ];
	res.render( 'user/payments', { title: 'Payments', scripts: scripts, styles: styles } );
};
ex.post_payments = ( req, res ) => {
	store.getPayments( { email: req.body.email } )
		.then( ( payments ) => {
			res.send( payments );
		} );
};
ex.post_make_payment = ( req, res ) => {
	store.makePayment( { id: req.body.id } )
		.then( () => {
			res.sendStatus( 200 );
		} );
};
ex.post_dispute_payment = ( req, res ) => {
	store.disputePayment( { id: req.body.id } )
		.then( () => {
			res.sendStatus( 200 );
		});
};

/**
 * pickup
 */
ex.get_pickup = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/pickup.js' } ];
	res.render( 'user/pickup', { title: 'Pickup', scripts: scripts, styles: styles } );
};

/**
 * feedback
 */
ex.get_feedback = ( req, res ) => {
	let styles = [ { style: '/stylesheets/style.css' } ];
	let scripts = [ { script: '/js/feedback.js' } ];
	res.render( 'user/feedback', { title: 'Feedback', scripts: scripts, styles: styles } );
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