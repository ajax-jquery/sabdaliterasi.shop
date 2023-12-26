createDialog().then( config => {
	return ClassicEditor
		.create( document.querySelector( '.editor' ), {
			ckbox: {
				tokenUrl: "https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt"
			}
		} )
		.then( editor => {
			window.editor = editor;
		} )
		.catch( handleSampleError );
} );

function handleSampleError( error ) {
	const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

	const message = [
		'Oops, something went wrong!',
		`Please, report the following error on ${ issueUrl } with the build id "8l21fjkq43m9-fkg83vmcac16" and the error stack trace:`
	].join( '\n' );

	console.error( message );
	console.error( error );
}
