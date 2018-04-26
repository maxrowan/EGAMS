$( () => {

	let url = 'https://localhost:3000';
	let endpoint = '/admin/disputes';

	$.post( url + endpoint, 'json' )
		.then( ( disputes ) => {
			showDisputedUsers( disputes );
		} );

	$( '.list-group' ).on( 'click', '.btn', ( event ) => {
		event.preventDefault();

		let userEmail = event.target.id;
		viewUser( userEmail );
	});
});

function showDisputedUsers( disputes ) {
	$.each( disputes, ( index, item ) => {
		console.log( item );

		$( '.list-group' ).append(
			"<li class=\"list-group-item user-item\">" + item.email +
			"<button id='" + item.email + "' class=\"btn btn-sm btn-default btn-user mt-0 mb-0\">View User</button></li>"
		);
	});
}

function viewUser( userEmail ) {
	set( 'user_email', userEmail );
	$( location ).attr( 'href', 'user' );
}