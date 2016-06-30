'use strict';

var internationalAddresses = require( './international-addresses' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  internationalAddresses.init();

  if ( !window.env ) {
    setTimeout( function() {
      var product = webStorageProxy.getItem( 'product_selected', localStorage );
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage );
      var issue = webStorageProxy.getItem( 'issue_selected', localStorage );

      /* alert(product + ', ' + subproduct + ', ' + issue); */
      switch ( product ) {

        case 'mortgage':
          $( '#company-intro-1' ).text( 'Mortgage company' );
          $( '#company-type-1' ).show();
          $( '#identify-mortgage-company' ).appendTo( '#company-type-1' );
          break;

        case 'student_loan':
          $( '#company-intro-1' ).text( 'Student loan company' );
          $( '#company-type-1' ).show();
          $( '#identify-student-loan-company' ).appendTo( '#company-type-1' );
          break;

        case 'vehicle_loan':
          $( '#company-intro-1' ).text( 'Vehicle loan company' );
          $( '#company-type-1' ).show();
          $( '#identify-vehicle-loan-company' ).appendTo( '#company-type-1' );
          break;

        case 'consumer_loan':
          $( '#company-intro-1' ).text( 'Company information' );
          $( '#company-type-1' ).show();
          $( '#identify-storefront-services-company' ).appendTo( '#company-type-1' );
          break;

        case 'card':
          $( '#company-intro-1' ).text( 'Card information' );
          $( '#company-type-1' ).show();
          $( '#identify-most-prepaids-company' ).appendTo( '#company-type-1' );
          break;

        case 'checking':
          $( '#company-intro-1' ).text( 'Bank information' );
          $( '#company-type-1' ).show();
          $( '#identify-checking-savings-company' ).appendTo( '#company-type-1' );
          break;

        case 'money_trans':
          $( '#company-intro-1' ).text( 'Company information' );
          $( '#company-type-1' ).show();
          $( '#identify-money-transfer-company' ).appendTo( '#company-type-1' );
          break;

        case 'credit_reporting':
          $( '#company-intro-1' ).text( 'Credit reporting company' );
          $( '#company-type-1' ).show();
          $( '#identify-credit-reporting-company' ).appendTo( '#company-type-1' );
          break;

        case 'debt':
          $( '#company-intro-1' ).text( 'Debt collection company' );
          $( '#company-type-1' ).show();
          $( '#identify-debt-collection-company' ).appendTo( '#company-type-1' );
          break;

        default:
          $( '#company-intro-1' ).text( 'Company information' );
          $( '#company-type-1' ).show();
          $( '#company-type-2' ).hide();

      }
      switch (subproduct) {

        case 'credit-repair':
          $( '#company-intro-1' ).text( 'Credit repair company' );
          $( '#company-type-1' ).show();
          $( '#identify-credit-reporting-company' ).remove();
          $( '#identify-credit-debt-repair-company' ).appendTo( '#company-type-1' );
          break;

        case 'debt-settlement':
          $( '#company-intro-1' ).text( 'Debt settlement company' );
          $( '#company-type-1' ).show();
          $( '#identify-money-transfer-company' ).remove();
          $( '#identify-credit-debt-repair-company' ).appendTo( '#company-type-1' );
          break;

        case 'domestic-money-transfer':
          $( '#company-intro-1' ).text( 'Money transfer company' );
          $( '#company-type-1' ).show();
          break;

        case 'international-money-transfer':
          $( '#company-intro-1' ).text( 'Money transfer company' );
          $( '#company-type-1' ).show();
          break;

        case 'foreign-currency-exchange':
          $( '#company-intro-1' ).text( 'Currency exchange company' );
          $( '#company-type-1' ).show();
          $( '#identify-credit-reporting-company' ).remove();
          $( '#identify-storefront-services-company' ).appendTo( '#company-type-1' );
      }
      switch (issue) {

        case 'debt_collection':
          $( '#company-intro-2' ).text( 'Debt collection company' );
          $( '#company-type-2' ).show();
          $( '#identify-debt-collection-company' ).appendTo( '#company-type-2' );
          break;

        case 'credit_reporting':
          $( '#company-intro-2' ).text( 'Credit reporting company' );
          $( '#company-type-2' ).show();
          $( '#identify-credit-reporting-company' ).appendTo( '#company-type-2' );
          break;

        default:
          $( '#company-type-2' ).hide();
      }
      /*
      if ( $( '.company-name-input' ).val()) {
      $(this).closest( '.identify-product-options' ).slideDown(200);
      }
      */
    }, 11 );
  }
  /*         var announceissue = localStorage.getItem("issue_selected").text()); */
  /*         alert(announceissue); */
  /*         $( '.select-product-or-issue' ).hide(); */
}

module.exports = {
  init: init
};
