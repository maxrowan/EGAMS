$( () => {

	$( '#email-search' ).val( '' );
	findUsers( false );

	$( '#btn-search' ).click( ( event ) => {
		event.preventDefault();

		if ( $( "#checkbox-payments-due" ).prop( "checked" ) ) {
			findUsers( true );
		} else {
			findUsers( false );
		}
	});

	$( '.list-group' ).on( 'click', '.btn', ( event ) => {
		event.preventDefault();

		let userEmail = event.target.id;
		viewUser( userEmail );
	});

});

function findUsers( payments ) {

	let url = 'https://localhost:3000';
	let endpoint = '/admin/userSearch';

	let email = $( '#email-search' ).val();

	let payload = { 'email': email, 'payments': payments };

	let lgi = $( '.list-group-item' );
	if ( lgi ){
		lgi.remove();
	}


	$.post( url + endpoint, payload, 'json' )
		.then( ( data ) => {

			$.each( data, ( index, item ) => {
				console.log( data );

				$( '.list-group' ).append(
					"<li class=\"list-group-item user-item\">" + item.email +
					"<button id='" + item.email + "' class=\"btn btn-sm btn-default btn-user mt-0 mb-0\">View</button></li>"
				);
			});
		} );
}

function viewUser( userEmail ) {
	set( 'user_email', userEmail );
	$( location ).attr( 'href', 'user' );
}