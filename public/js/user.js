function setUserData( user ) {
	if ( user.first_name )
		$.cookie( 'first_name', user.first_name );

	if ( user.last_name )
		$.cookie( 'last_name', user.last_name );

	if ( user.email )
		$.cookie( 'email', user.email );

	if ( user.address )
		$.cookie( 'address', user.address );

	if ( user.pickup_time )
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

