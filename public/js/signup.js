$( function () {

	let url = 'https://localhost:3000';

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

		$.post( url + endpoint, payload, 'text' )
			.then( ( valid ) => {
				if ( valid  ){
					$( location ).attr( 'href', 'site' );
				} else {
					alert( 'signup failed' );
				}
			} );
	} );
} );

