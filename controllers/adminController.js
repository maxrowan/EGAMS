let ex = module.exports = {};
let store = require( '../private/adminStore' );

/**
 * Sign in
 */
ex.get_login = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/login.js' } ];
	res.render( 'admin/login', { title: 'Admin Log In', scripts: scripts, styles: styles } );
};
ex.post_login = ( req, res ) => {
	store.authenticate( {
			email: req.body.email,
			password: req.body.password
		} )
		.then( ( admin ) => {
			if ( admin.success ) {
				res.send( admin );
			} else {
				res.send( false );
			}
		} );
};

/**
 * Create Other Administrator Accounts
 */
ex.get_create_account = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/createAccount.js' } ];
	res.render( 'admin/createAccount', { title: 'Create Admin Account', scripts: scripts, styles: styles } );
};
ex.post_create_account = ( req, res ) => {
	store.createAccount( {
			email: req.body.email,
			password: req.body.password,
			first_name: req.body.first_name,
			last_name: req.body.last_name
		} )
		.then( ( valid ) => {
			if ( valid ) {
				res.send( true );
			} else {
				res.send( false );
			}
		} );
};

/**
 * home
 */
ex.get_home = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/home.js' } ];
	res.render( 'admin/home', { title: 'Home', scripts: scripts, styles: styles } );
};

/**
 * find user
 */
ex.get_find_user = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/userSearch.js' } ];
	res.render( 'admin/userSearch', { title: 'Home', scripts: scripts, styles: styles } );
};
ex.post_find_user = ( req, res ) => {
	store.findUser( {
			email: req.body.email,
			payments: req.body.payments
		} )
		.then( ( data ) => {
			res.send( data );
		} );
}; // Search for a User// Check accounts with Payments Due

/**
 * get user info
 */
ex.get_user_info = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/user.js' } ];
	res.render( 'admin/user', { title: 'User Info', scripts: scripts, styles: styles } );
};
ex.post_user_info = ( req, res ) => {
	store.getUserInfo( { email: req.body.email } )
		.then( ( data ) => {
			res.send( data );
		} );
};
// Update Customer Billing Information

/**
 * suspend or un-suspend user
 */
ex.post_suspend = ( req, res ) => {
	store.suspend( {
			email: req.body.email,
			suspend: req.body.suspend
		} )
		.then( () => {
			res.sendStatus( 200 );
		} );
};

// Send Receipts to Customers


/**
 * disputes
 */
ex.get_disputes = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/billDisputes.js' } ];
	res.render( 'admin/billDisputes', { title: 'Disputes', scripts: scripts, styles: styles } );
};
ex.post_disputes = ( req, res ) => {
	store.getDisputes().then( ( disputes ) => {
		res.send( disputes );
	} );
};

/**
 * feedback
 */
ex.get_feedback = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/feedback.js' } ];
	res.render( 'admin/feedback', { title: 'Feedback', scripts: scripts, styles: styles } );
};
ex.post_feedback = ( req, res ) => {
	store.getFeedback().then( ( feedback ) => {
		res.send( feedback );
	} );
};
ex.get_message = ( req, res ) => {
	let styles = [ { style: '/stylesheets/admin.css' } ];
	let scripts = [ { script: '/adminJS/message.js' } ];
	res.render( 'admin/message', { title: 'Message', scripts: scripts, styles: styles } );
};
