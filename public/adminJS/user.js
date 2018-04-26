$( () => {

	let url = 'https://localhost:3000';
	let email = get( 'user_email' );

	getUserInfo( url, email );

	// TODO: handle send receipts


	$( '#btn-suspend-account' ).click( () => {
		toggleSuspend( url, email );
	});


});

function getUserInfo( url, email ) {
	let endpoint = '/admin/userInfo';

	$.post( url + endpoint, { email: email }, 'json' )
		.then( ( info ) => {
			displayInfo( info );
		});
}

function displayInfo( info ) {
	let userInfo = info[0];

	$( '#first-name' ).text( userInfo.first_name );
	$( '#last-name' ).text( userInfo.last_name );
	$( '#email' ).text( userInfo.email );
	$( '#address' ).text( userInfo.address );
	$( '#suspended' ).text( userInfo.suspended );

	setBtnSuspend( userInfo.suspended );

	$( 'li' ).remove();

	$.each( info, ( index, payment ) => {
		displayPayment( payment );
	});
}

function displayPayment( payment ) {

	let paid = ( payment.paid ? { color: 'default', text: 'Paid' } : { color: 'warning', text: 'Outstanding' } );

	// display disputes
	let disputed = ( payment.disputed ? "<span class=\"badge badge-danger disputed ml-2 p-2\">Disputed</span>" : '');

	$( '.list-group' ).append(
		"<li class=\"list-group-item payment-item\">" +
		payment.payment_for + ': ' + '$' + payment.amount_due +
		disputed +
		"<button id='" + payment.id + "' class=\"btn btn-sm btn-primary btn-receipt mt-0 mb-0\">Send Receipt</button>" +
		"<span class=\"badge badge-paid-status badge-" + paid.color + " mr-2 p-2\">" + paid.text + "</span></li>"
	);
}

function toggleSuspend( url, email ) {
	let suspended = ( $( '#btn-suspend-account' ).text() === 'Revoke Suspension' );

	let endpoint = '/admin/suspend';

	$.post( url + endpoint, { email: email, suspend: !suspended } )
		.then( ( status ) => {
			console.log( status );
			setBtnSuspend( !suspended );
		})
}

function setBtnSuspend( suspended ) {
	let btnSuspend = $( '#btn-suspend-account' );
	if ( suspended ) {
		btnSuspend.removeClass( 'btn-danger' );
		btnSuspend.addClass( 'btn-primary' );
		btnSuspend.text( 'Revoke Suspension' );
	} else {
		btnSuspend.removeClass( 'btn-primary' );
		btnSuspend.addClass( 'btn-danger' );
		btnSuspend.text( 'Suspend' );
	}
}