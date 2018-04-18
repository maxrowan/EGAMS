let login = document.querySelector( '.login' );

login.addEventListener( 'submit', ( event ) => {
	event.preventDefault();
	let email = login.querySelector( '.email' ).value;
	let password = login.querySelector( '.password' ).value;
	post( '/login', { email, password } )
		.then( ( { status } ) => {
			(status === 200 ? alert( 'login success' ) : alert( 'login failed' ));
		} );
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

let signupBtn = document.getElementById( 'btn_signup' );
signupBtn.addEventListener( 'click', () => {
	get( '/signup' );
});

function get( path ) {
	return window.fetch( path, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	} );
}