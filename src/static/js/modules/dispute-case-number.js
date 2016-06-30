'use strict';

var webStorageProxy = require( '../modules/util/web-storage-proxy' );
var _caseNumberDom;

function init() {
  var product = webStorageProxy.getItem( 'product_selected', localStorage );
  if ( product === 'credit_reporting' ) {
    // Handle showing dispute case number.
    var attemptedContactYesDom = document.querySelector( '#resolution-options-list' );
    _caseNumberDom = document.querySelector( '#case-number' );
    attemptedContactYesDom.addEventListener( 'click', _showCaseInput );
  }
}

function _showCaseInput( evt ) {
  var target = evt.target;
  var productId = 'product_selected';
  var product = webStorageProxy.getItem( productId, window.localStorage );
  if ( target.id === 'contacted-company' &&
       product === 'credit_reporting' ) {
    // TODO: Remove when toggle buttons are working correctly.
    //       This is an awful hack to get the selecting to jump back and forth
    //       between the yes/no radio buttons correctly.
    document.querySelector( '#contacted-cfpb' ).parentNode.classList.remove( 'active' );
    _caseNumberDom.classList.remove( 'u-hidden' );
  } else {
    document.querySelector( '#contacted-company' ).parentNode.classList.remove( 'active' );
    _caseNumberDom.classList.add( 'u-hidden' );
  }
}

module.exports = {
  init: init
};
