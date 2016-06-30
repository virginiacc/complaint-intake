'use strict';

var internationalAddresses = require( './international-addresses' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  internationalAddresses.init();

  if( !window.env ) {
    setTimeout( function() {
      var product = webStorageProxy.getItem( 'product_selected', localStorage );
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage );
      var issue = webStorageProxy.getItem( 'issue_selected', localStorage );

      // alert(product + ', ' + subproduct + ', ' + issue);
      switch ( product ) {
        case 'mortgage':
          $( '#primary-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#primary-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#primary-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#additional-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#additional-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'student_loan':
          $( '#primary-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#primary-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#primary-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#additional-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#additional-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'vehicle_loan':
          $( '#primary-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#primary-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#primary-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#additional-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#additional-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#additional-consumer-identity-option4' ).remove();
          // NOTE THAT THIS DOES NOT WORK FOR LEASES !!
          break;

        case 'consumer_loan':
          $( '#primary-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#primary-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#primary-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary borrower' );
          $( '#additional-consumer-identity-option2' ).text( 'Co-borrower' );
          $( '#additional-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'card':
          $( '#primary-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#primary-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#primary-consumer-identity-option3' ).text( 'Additional card holder' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#additional-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#additional-consumer-identity-option3' ).text( 'Additional card holder' );
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'checking':
          $( '#primary-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#primary-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#primary-consumer-identity-option3' ).remove();
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#additional-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#additional-consumer-identity-option3' ).remove();
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'credit_reporting':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'debt':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        default:
          $( '#primary-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#primary-consumer-identity-option2' ).text( 'Additional account holder' );
          $( '#primary-consumer-identity-option3' ).text( 'Joint account holder' );
          $( '#primary-consumer-identity-option4' ).text( 'Additional card holder' );
          $( '#primary-consumer-identity-option5' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option6' ).text( 'Co-borrower' );
          $( '#primary-consumer-identity-option7' ).text( 'Sender' );
          $( '#primary-consumer-identity-option8' ).text( 'Recipient' );
      }

      switch (subproduct) {

        case 'vehicle-lease':
          $( '#primary-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#primary-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#primary-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#additional-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#additional-consumer-identity-option3' ).text( 'Co-signer' );
          $( '#additional-consumer-identity-option4' ).remove();
          break;

        case 'international-money-transfer':
          $( '#primary-consumer-identity-option1' ).text( 'Sender' );
          $( '#primary-consumer-identity-option2' ).text( 'Recipient' );
          $( '#primary-consumer-identity-option3' ).remove();
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Sender' );
          $( '#additional-consumer-identity-option2' ).text( 'Recipient' );
          $( '#additional-consumer-identity-option3' ).remove();
          $( '#additional-consumer-identity-option4' ).remove();
          $( '#add-consumer-label' ).text( 'Do you want to include an additional consumer?' );
          $( '#consumer1-identity' ).show().slideDown();
          break;

        case 'domestic-money-transfer':
          $( '#primary-consumer-identity-option1' ).text( 'Sender' );
          $( '#primary-consumer-identity-option2' ).text( 'Recipient' );
          $( '#primary-consumer-identity-option3' ).remove();
          $( '#primary-consumer-identity-option4' ).remove();
          $( '#additional-consumer-identity-option1' ).text( 'Sender' );
          $( '#additional-consumer-identity-option2' ).text( 'Recipient' );
          $( '#additional-consumer-identity-option3' ).remove();
          $( '#additional-consumer-identity-option4' ).remove();
          $( '#add-consumer-label' ).text( 'Do you want to include an additional consumer?' );
          $( '#consumer1-identity' ).show().slideDown();
          break;

        case 'check-cashing':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'money-order':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'mobile-wallet':
          $( '#consumer1-identity' ).hide();
          $( '#additional-consumer-identity-option1' ).text( 'Primary account holder' );
          $( '#additional-consumer-identity-option2' ).text( 'Joint account holder' );
          $( '#additional-consumer-identity-option4' ).text( 'Recipient' );
          break;

        case 'refund-anticipation':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'traveler-or-cashier':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'virtual-currency':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        case 'debt-settlement':
          $( '#consumer1-identity' ).hide();
          $( '#consumer2-identity' ).remove();
          break;

        default:
          $( '#consumer1-identity' ).hide();
      }

      /*
      if ( $( '.company-name-input' ).val()) {
      $(this).closest( '.identify-product-options' ).slideDown(200);
      }
      */
    }, 11);
  }
}

module.exports = {
  init: init
};
