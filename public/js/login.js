
$( () => {
	$( '#btn_signin' ).click( ( event ) => {
		event.preventDefault();

		let url = 'http://localhost:3000';
		let endpoint = '/login';

		let email = $( '#email' ).val();
		let password = $( '#password' ).val();

		let payload = { 'email': email, 'password': password };

		$.post( url + endpoint, payload, 'json' )
			.then( ( data ) => {

				console.log( data );	// TODO: remove

				let user = {
					first_name: data.first_name,
					last_name: data.last_name,
					email: data.email,
					address: data.address,
					pickup_time: data.pickup_time
				};

				if ( data.success ) {
					setUserData( user );
					$( location ).attr( 'href', 'site' );
				} else {
					alert( 'Username or password is incorrect' );
				}
			} );
	} );
} );