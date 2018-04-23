
$( () => {
	let user = getUserData();

	$( '#form_email' ).val( user.email );

	$( '#btn_send' ).click( () => {
		// TODO: insert into db with sending user, subject, and message
	});
});