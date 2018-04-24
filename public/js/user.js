function setUserData( user ) {

	$.cookie( 'first_name', null );
	$.cookie( 'first_name', user.first_name );

	$.cookie( 'last_name', null );
	$.cookie( 'last_name', user.last_name );

	$.cookie( 'email', null );
	$.cookie( 'email', user.email );

	$.cookie( 'address', null );
	$.cookie( 'address', user.address );

	$.cookie( 'pickup_time', null );
	$.cookie( 'pickup_time', user.pickup_time );
}

function getUserData() {
	return {
		first_name: $.cookie( 'first_name' ),
		last_name: $.cookie( 'last_name' ),
		email: $.cookie( 'email' ),
		address: $.cookie( 'address' ),
		pickup_time: $.cookie( 'pickup_time' )
	};
}

