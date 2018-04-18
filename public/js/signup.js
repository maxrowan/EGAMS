let signup = document.querySelector( '.signup' );

signup.addEventListener( 'submit', ( event ) => {
	event.preventDefault();
	let email = signup.querySelector( '.email' ).value;
	let password = signup.querySelector( '.password' ).value;
	let firstName = signup.querySelector( '.first_name' ).value;
	let lastName = signup.querySelector( '.last_name' ).value;
	let address = signup.querySelector( '.address' ).value;
	post( '/signup', { email, password, firstName, lastName, address } );
} );

function post( path, data ) {
	return window.fetch( path, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	} );
}

