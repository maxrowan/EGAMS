$( () => {

	let url = 'https://localhost:3000';
	let email = getUserData().email;

	// get payments for user
	getPayments( url, email );

	//TODO: add dispute bill feature

	// pay or dispute
	$( '.row' ).on( 'click', '.btn', ( event ) => {
		let id = $(event.target).closest( 'li' ).attr( 'id' );

		if ( event.target.classList.contains( 'btn-pay' ) ) {
			makePayment( url, email, id );
		} else {
			disputePayment( url, email, id );
		}
	} );
} );

function getPayments( url, email ) {
	let endpoint = '/site/payments';

	let payments_section = $( '.col-lg-6' );
	if ( payments_section ) {
		payments_section.remove();
	}

	$.post( url + endpoint, { email: email }, 'json' )
		.then( ( payments ) => {
			if ( payments.length > 0 && hasOutstandingPayments( payments ) ) {		// if the user has  outstanding payments
				showPayments( payments ); 											// add payments to $( '.list-group' )
			} else {
				noPayments();														// display a message saying 'no payments'
			}
		} );
}

function makePayment( url, email, id ) {
	let endpoint = '/site/make_payment';

	$.post( url + endpoint, { id: id }, 'json' )
		.then( () => {
			getPayments( url, email );												// update payments
		} );
}

function disputePayment( url, email, id ) {
	let endpoint = '/site/dispute_payment';

	$.post( url + endpoint, { id: id }, 'json' )
		.then( () => {
			alert( 'You\'ve disputed a payment' );
		} );
}


function showPayments( payments ) {

	$( '.row' ).append(
		"<div class=\"col-lg-6\">" +
		"<ul class=\"list-group\"></ul>" +
		"</div>" );

	$.each( payments, ( index, payment ) => {

		if ( !payment.paid ) {
			$( '.list-group' ).append(
				"<li id='" + payment.id + "' class=\"list-group-item payment-item\">" +
			payment.payment_for + ': ' + '$' + payment.amount_due +
			"<button class=\"btn btn-sm btn-danger btn-dispute mt-0 mb-0\">Dispute</button>" +
			"<button class=\"btn btn-sm btn-primary btn-pay mt-0 mb-0\">Pay</button></li>" );
		}
	} );
}

function hasOutstandingPayments( payments ) {

	let outstanding = false;
	$.each( payments, ( index, payment ) => {
		if ( !payment.paid ) {
			outstanding = true;
		}
	} );
	return outstanding;
}

function noPayments() {
	$( '.row' ).append( "<h1>You have no outstanding payments</h1>" );
}