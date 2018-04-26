let messages = [];

$( () => {

	let url = 'https://localhost:3000';
	let endpoint = '/admin/feedback';

	$.post( url + endpoint, 'json' )
		.then( ( feedback ) => {
			showfeedback( feedback );
		} );

	$( '.list-group' ).on( 'click', '.btn', ( event ) => {
		event.preventDefault();

		let id = $(event.target).closest( 'li' ).attr( 'id' );
		let message = messages[ id ];

		viewMessage( message );
	});
});

function showfeedback( feedback ) {
	$.each( feedback, ( index, item ) => {

		$( '.list-group' ).append(
			"<li id='" + index + "' class=\"list-group-item user-item\">" +
			"<span class='list-email ml-4'>Email: " + item.email + "</span>" +
			"<span class='list-subject'>Subject: " + item.subject + "</span>" +
			"<button class=\"btn btn-sm btn-default btn-user my-0 mr-4\">View Message</button></li>"
		);

		messages.push( { email: item.email, subject: item.subject, message: item.message } );
	});
}

function viewMessage( message ) {

	// save message
	set( 'message_email', message.email );
	set( 'message_subject', message.subject );
	set( 'message_message', message.message );

	$( location ).attr( 'href', 'message' );
}