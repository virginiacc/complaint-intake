'use strict';

var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  if( !window.env ) {
    setTimeout( function(){
      $( '#product_options .radio_input' ).click( function(){
        // save the product to local storage
        var prod = $( this ).attr( 'id' );
        webStorageProxy.setItem( 'product_selected', prod, localStorage );
        webStorageProxy.setItem( 'consent', 'false', localStorage );
      } );
    }, 1);

    setTimeout( function(){
      $( '#subproduct_options .radio' ).click( function(){
        // save the subproduct to local storage
        var subpro = $( this ).attr( 'id' );
        var issuelist = $( this ).attr( 'issues' );
        webStorageProxy.setItem( 'issue_list', issuelist, localStorage );
        webStorageProxy.setItem( 'subproduct_selected', subpro, localStorage );
        /*
            if ( $(this).attr('id') == 'payday-loan' ){
          alert('payday is happening.');
        }
        */

        /*      alert(subpro + ', ' + issuelist); */
      } );
    }, 1);
  }
}

module.exports = {
  init: init
};
