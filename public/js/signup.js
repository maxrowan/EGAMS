$( function () {

	let url = 'http://localhost:3000';

	/**
	 * Register
	 */
	$( '#btn_submit' ).click( ( event ) => {
		event.preventDefault();

		let endpoint = '/signup';

		let fName = $( '#first_name' ).val();
		let lName = $( '#last_name' ).val();
		let email = $( '#email' ).val();
		let password = $( '#password' ).val();
		let address = $( '#address' ).val();


		let payload = {
			'email': email,
			'password': password,
			'first_name': fName,
			'last_name': lName,
			'address': address
		};

		console.log( payload );	// TODO: remove

		$.post( url + endpoint, payload, 'text' )
			.then( ( { status } ) => {
				(status === 200 ?
					alert( 'signup success' )
					/* $( location ).attr( 'href', 'homepage' ); */ :
					alert( 'signup failed' )); // TODO: link to homepage (if successful)

			} );
	} );
} );

