function setUserData( user ) {
	$.cookie( 'first_name', user.first_name );
	$.cookie( 'last_name', user.last_name );
	$.cookie( 'email', user.email );
	$.cookie( 'address', user.address );
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

