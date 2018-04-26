const request = require( 'supertest' );
const app = require( '../app' );

describe( 'Test the root path (auth)', () => {

	test( 'User login GET', () => {
		return request( app ).get( '/' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Signup page GET', () => {
		return request( app ).get( '/signup' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'User login POST', () => {

	});

} );

describe( 'Test the /site path', () => {

	test( 'User homepage GET', () => {
		return request( app ).get( '/site' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'User profile GET', () => {
		return request( app ).get( '/site/profile' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'User payments GET', () => {
		return request( app ).get( '/site/payments' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'User pickup GET', () => {
		return request( app ).get( '/site/pickup' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'User feedback GET', () => {
		return request( app ).get( '/site/feedback' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

} );

describe( 'Test the /admin path', () => {

	test( 'Admin login GET', () => {
		return request( app ).get( '/' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin create account GET', () => {
		return request( app ).get( '/admin/createAccount' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin home GET', () => {
		return request( app ).get( '/admin/home' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin user search GET', () => {
		return request( app ).get( '/admin/userSearch' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin view user GET', () => {
		return request( app ).get( '/admin/user' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin disputes GET', () => {
		return request( app ).get( '/admin/billDisputes' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin feedback GET', () => {
		return request( app ).get( '/admin/feedback' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

	test( 'Admin message GET', () => {
		return request( app ).get( '/admin/message' ).then( response => {
			expect( response.statusCode ).toBe( 200 );
		} );
	} );

} );