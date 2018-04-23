$( () => {
	setFormFields();

	$('#modal_btn_submit').click( ( event ) => {
		event.preventDefault();

		let email = $( '#modal_email').val();
		let password = $( '#modal_password' ).val();


		validate( email, password )
			.then( (status) => {
				console.log( status );
				if ( status === 'OK' ) {
					$( '#validateModal' ).modal( 'toggle' );

					$('.form-control').removeAttr( 'disabled' );

					$('#btn_cancel').removeAttr( 'hidden' );
					$('#btn_save' ).removeAttr( 'hidden' );
				} else {
					alert( 'Username or password is incorerect' );
				}
			});
	} );

	$( '#btn_cancel' ).click( () => {
		$('.form-control').attr( 'disabled' );

		$(this).attr( 'hidden' );
		$('#btn_save' ).attr( 'hidden' );
	});

	$( '#btn_save').click( () => {

		let firstName = $( '#form_first_name' ).val();
		let lastName = $( '#form_last_name' ).val();
		let email = $( '#form_email' ).val();
		let address = $( '#form_address' ).val();

		let url = 'http://localhost:3000';
		let endpoint = '/update';

		let payload = { 'first_name': firstName, 'last_name': lastName, 'email': email, 'address': address };
		$.post( url + endpoint, payload, 'json' );

		setUserData( payload );

		setFormFields()
	});
});

function setFormFields() {
	let user = getUserData();

	$( '#form_first_name' ).val( user.first_name );
	$( '#form_last_name' ).val( user.last_name );
	$( '#form_email' ).val( user.email );
	$( '#form_address' ).val( user.address );
}