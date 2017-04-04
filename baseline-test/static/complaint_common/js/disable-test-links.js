$( document ).ready( function() {
  $( 'body' ).on( 'click', 'a[href="#"]', function( event ) {
    event.preventDefault();
  } );
} );
