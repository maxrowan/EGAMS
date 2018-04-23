
$( () => {
	let user = getUserData();

	$( '#pickup_time' ).text( 'Your pickup time: ' + user.pickup_time );
});