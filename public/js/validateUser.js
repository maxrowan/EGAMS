let url = 'http://localhost:3000';
let endpoint = '/validate';

function validate( email, password ) {
	let payload = { 'email': email, 'password': password };
	return $.post( url + endpoint, payload, 'json' );
}