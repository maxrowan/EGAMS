$( function () {

	let url = 'https://localhost:3000';

	/**
	 * Register
	 */
	$( '#btn_submit' ).click( ( event ) => {
		event.preventDefault();

		let endpoint = '/admin/createAccount';

		let payload = {
			'email': $( '#email' ).val(),
			'password': $( '#password' ).val(),
			'first_name': $( '#first_name' ).val(),
			'last_name': $( '#last_name' ).val()
		};

		console.log( payload );	// TODO: remove

		$.post( url + endpoint, payload, 'text' )
			.then( ( valid ) => {
				if ( valid  ){
					$( location ).attr( 'href', 'admin/home' );
				} else {
					alert( 'signup failed' );
				}
			} );
	} );
} );

