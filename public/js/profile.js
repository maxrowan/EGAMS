$( () => {
	let user = getUserData();

	$( '#form_first_name' ).val( user.first_name );
	$( '#form_last_name' ).val( user.last_name );
	$( '#form_email' ).val( user.email );
	$( '#form_address' ).val( user.address );

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

	$( '#btn_submit').click( () => {
		// TODO: submit changes to DB
	});
});