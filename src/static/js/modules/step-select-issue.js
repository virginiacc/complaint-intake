'use strict';

var disputeCaseNumber = require( './dispute-case-number' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  disputeCaseNumber.init();

  if( !window.env ){
    setTimeout( function() {
      // grab stuff from step 1
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage );
      var subproductname = subproduct.replace('-', ' ').replace('-', ' ').replace('-', ' ').replace('-', ' ').replace('-', ' ');
      var issuelist = webStorageProxy.getItem( 'issue_list', localStorage );
      $( '#product-name-in-subhead' ).text( subproductname );
      $( '.all-topissues' ).hide();
      $( '#issue_options_' + issuelist ).slideDown( 200 );
      // $('#issue_options_' + issuelist).show();
    }, 1 );

    setTimeout( function() {
      $( '#select_issue .all-topissues .radio_input' ).click( function() {
        // save the topissue to local storage
        var issueselected = $( this ).attr( 'id' );
        webStorageProxy.setItem( 'issue_selected', issueselected, localStorage );
      } );
    }, 1 );
  }
}

module.exports = {
  init: init
};
