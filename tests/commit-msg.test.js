
var fs = require( 'fs' );
var exec = require( 'child_process' ).exec;
var filePath = process.cwd() + '/msgFile.txt';

function createMsgFile( msg ) {
	fs.writeFileSync( filePath, msg, 'utf8' );
}

describe( 'Hook commit-msg', function() {
	it( 'Deve estar com o padrão correto da mensagem', function( done ) {
		createMsgFile( '[DVIZ-123] TESTE' );
		var child = exec( 'node hooks/commit-msg.js ' + filePath );

		child.on( 'close', function( code ) { 
			expect( code ).to.equal( 0 );
			done();
		} );
	} );
} );

after( function() {
	fs.unlinkSync( filePath );
});

