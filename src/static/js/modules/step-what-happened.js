'use strict';

var internationalAddresses = require( './international-addresses' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  internationalAddresses.init();

  if( !window.env ) {
    setTimeout( function() {
      $( '#what-happened' ).change( function() {
          // save the product to local storage
          var narrative = $( this ).val();
          webStorageProxy.setItem( 'narrative', narrative, localStorage );
      } );
      $( '#desired-resolution' ).change( function() {
          // save the product to local storage
          var desiredres = $( this ).val();
          webStorageProxy.setItem( 'desiredres', desiredres, localStorage );
      } );
      $( '#narrative-consent-checkbox' ).change( function() {
        if ( $(this).is(':checked') ) {
          webStorageProxy.setItem( 'consent', 'true', localStorage );
        } else {
          webStorageProxy.setItem( 'consent', 'false', localStorage );
        }
      } );
    }, 1);
  }
}

module.exports = {
  init: init
};
