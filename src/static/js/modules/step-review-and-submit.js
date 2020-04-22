'use strict';

var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  $( '#review-narrative-consent' ).hide();
  $( '#narrative-consent-take-two' ).hide();

  if( !window.env ) {
    setTimeout( function() {
      // grab stuff from step 1
      var product = webStorageProxy.getItem( 'product_selected', localStorage ).replace( '_', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '_', ' ' ).replace( '_', ' ' ).replace( '_', ' ' ).replace( '_', ' ' ).replace( '_', ' ' );
      
      console.log(product)
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' );
      var issue = webStorageProxy.getItem( 'issue_selected', localStorage ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' ).replace( '-', ' ' );
      console.log(issue);
      var issuetext = webStorageProxy.getItem( 'issuetext', localStorage );
      var subissuetext = webStorageProxy.getItem( 'subissuetext', localStorage );

      var desiredres = webStorageProxy.getItem( 'desiredres', localStorage );
      var narrative = webStorageProxy.getItem( 'narrative', localStorage );
      var consent = webStorageProxy.getItem( 'consent', localStorage );
      var desiredres = webStorageProxy.getItem( 'desiredres', localStorage );

      // if ( product == 'checking' ) {
      //   product = "Checking or savings account";
      // }

      // $( '#review-product-name' ).text( product.charAt(0).toUpperCase() + product.substr(1) );
      $( '#review-subproduct-name' ).text(subproduct.charAt(0).toUpperCase() + subproduct.substr(1));

      // $( '#review-issue-name' ).text(issue);
      // if ( narrative !== null ) {
      //   $( '#review-what-happened-text' ).text( narrative );
      // }
      /*
      if (desiredres !== null) {
      $( '#review-desired-resolution-text' ).text(desiredres);
      }
      */
      if ( consent === 'true' ) {
        $( '#narrative-consent-take-two' ).hide();
        $( '#review-narrative-consent' ).show();
      }

      if ( consent === 'false' ) {
        $( '#review-narrative-consent' ).hide();
        $( '#narrative-consent-take-two' ).show();
      }
    }, 1 );
  }
}

module.exports = {
  init: init
};
