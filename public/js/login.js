$( function () {

	let url = 'http://localhost:3000';

	/**
	 * Submit email and password
	 */
	$( '#btn_signin' ).click( ( event ) => {
		event.preventDefault();

		let endpoint = '/login';

		let email = $( '#email' ).val();
		let password = $( '#password' ).val();

		let payload = { 'email': email, 'password': password };

		console.log( payload );	// TODO: remove

		$.post( url + endpoint, payload, 'text' )
			.then( ( { status } ) => {
				(status === 200 ?
					alert( 'login success' )
					/* $( location ).attr( 'href', 'homepage' ); */ :
					alert( 'login failed' )); // TODO: link to homepage
			} );
	} );
} );