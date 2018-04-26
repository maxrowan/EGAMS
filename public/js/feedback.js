
$( () => {
	let user = getUserData();

	$( '#form_email' ).val( user.email );

	$( '#btn_send' ).click( ( event ) => {
		event.preventDefault();

		submitFeedback();
	});
});

function submitFeedback() {
	let url = 'https://localhost:3000';
	let endpoint = '/site/submit_feedback';

	let email = $( '#form_email' ).val();
	let subject = $( '#form_subject' ).val();
	let message = $( '#form_message' ).val();

	let payload = {
		email: email,
		subject: subject,
		message: message
	};

	$.post( url + endpoint, payload, 'json' )
		.then( () => {
			console.log( 'opening modal' );
			$( '#feedbackModal' ).modal( 'toggle' );
		} );
}