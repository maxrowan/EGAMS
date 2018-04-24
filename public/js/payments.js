$( () => {

	let url = 'http://localhost:3000';
	let endpoint = '/site/payments';

	let email = getUserData().email;

	// get payments for user
	$.post( url + endpoint, { email: email }, 'json' )
		.then( ( payments ) => {
			payments.length > 0 ?							// if the user has payments
				showPayments( payments ) :					// add payments to $( '.list-group' )
				noPayments();								// display a message saying 'no payments'
		} );
} );

function showPayments( payments ) {
	$( '.row' ).append(
		"<div class=\"col-lg-6\">" +
		"<ul class=\"list-group\"></ul>" +
		"</div>" );

	$.each( payments, ( index, payment ) => {
		$( '.list-group' ).append(
			"<li class=\"list-group-item payment-item\">" +
			payment.payment_for + ': ' + '$' + payment.amount_due +
			"<button class=\"btn btn-sm btn-danger mt-0 mb-0\">Pay</button>" + "</li>"
		);
	} );
}

function noPayments() {
	$( '.row' ).append( "<h1>You have no outstanding payments</h1>" );
}