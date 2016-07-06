'use strict';

var internationalAddresses = require( './international-addresses' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  // Show/hide product identification options.
  $( 'fieldset.identify-options' ).hide();

  internationalAddresses.init();

   // Show/hide military status
  $( '.cr-servicemember input' ).on( 'change', function(){
    if ( $( '.cr-need-servicemember-info' ).is( ':checked' ) ) {
      $( '.cr-servicemember-info, .cr-military-status' ).slideDown( 400 );
      $( '.cr-military-status hr' ).hide();
    } else if ( $( '.cr-need-military-status' ).is( ':checked' ) ) {
      $( '.cr-military-status' ).slideDown( 400 );
      $( '.cr-servicemember-info' ).slideUp( 300 );
      $( '.cr-military-status hr' ).show();
    } else {
      $( '.cr-servicemember-info, .cr-military-status' ).slideUp( 300 );
    }
  } );
  $( '.cr-military-status' ).slideUp();

  // Show/hide sections of Your Info.
  $( 'fieldset.additional-consumer' ).hide();
  $( 'fieldset.point-of-contact' ).hide();

  $( '.add-consumer-yes' ).on( 'change', function(){
    if ( $( '.add-consumer-yes' ).is( ':checked' ) ) {
      $( 'fieldset.additional-consumer' ).slideDown( 400 );
      $( '.cr-add-con label.active' ).removeClass( 'active' );
      $( this ).closest( 'label' ).addClass( 'active' );
    }
  } );

  $( '.add-consumer-no' ).on( 'change', function(){
    if ( $( '.add-consumer-no' ).is( ':checked' ) ) {
      $( 'fieldset.additional-consumer' ).slideUp( 400 );
      $( '.cr-add-con label.active' ).removeClass( 'active' );
      $( this ).closest( 'label' ).addClass( 'active' );
    }
  } );

  $( '.add-poc-yes' ).on( 'change', function(){
    if ( $( '.add-poc-yes' ).is( ':checked' ) ) {
      $( 'fieldset.point-of-contact' ).slideDown( 400 );
      $( '.cr-add-poc label.active' ).removeClass( 'active' );
      $( this ).closest( 'label' ).addClass( 'active' );
    }
  } );

  $( '.add-poc-no' ).on( 'change', function() {
    if ( $( '.add-poc-no' ).is( ':checked' ) ) {
      $( 'fieldset.point-of-contact' ).slideUp( 400 );
      $( '.cr-add-poc label.active' ).removeClass( 'active' );
      $( this ).closest( 'label' ).addClass( 'active' );
    }
  } );

  // -------------------------------

  $( '#debt-obtained input' ).on( 'change', function() {
    if ( $( '.cr-debt-inperson' ).is( ':checked' ) ) {
      $( '.debt-website' ).slideUp( 400 );
      $( '.debt-state' ).slideDown( 400 );
    } else if ( $( '.cr-debt-online' ).is( ':checked' ) ) {
      $( '.debt-website' ).slideDown( 400 );
      $( '.debt-state' ).slideUp( 400 );
    }
  } );

  $( '#relationship-to-person select' ).change( function() {
    if( $( '.ans-rel-other' ).is( ':checked' ) ) {
      $( '#ans-rel-other-who' ).slideDown();
    } else {
      $( '#ans-rel-other-who' ).slideUp();
    }
  } );

  $( '#consumer-info-no-email' ).hide();
  $( '#cr-no-email' ).change( function() {
    if ( $( '#cr-no-email' ).is( ':checked' ) ) {
      $( '#consumer-info-no-email' ).slideDown();
    } else {
      $( '#consumer-info-no-email' ).slideUp();
    }
  } );

  // SLIDE DOWN ALTERNATIVE IDENTIFICATION METHODS.

  $( '.identify-user' ).on( 'change', function() {

    if ( $( '.identification-type' ).is( ':checked' ) ) {
      var identifytype = $(this).attr( 'value' );
      $( 'fieldset.identify-options.active' ).hide();
      $( '.identify-options' ).removeClass( 'active' );
      $( 'fieldset.' + identifytype).slideDown().addClass( 'active' );

      if ( identifytype == 'someone-else' ) {
        // When "someone else" is selected, the "Point of contact" section slides down, the optional question slides up, and the header text changes
        $( 'fieldset.point-of-contact' ).slideDown();
        $( 'fieldset.point-of-contact-question' ).slideUp();
        $( '#point-of-contact-header' ).text( 'Point of contact' );
      } else if ( identifytype != 'someone-else' && $( '.add-poc-yes' ).is( ':checked' ) ) {
        // When "someone else" is not selected, but the consumer has already said "Yes" in the "Point of contact" section, the Point of contact section stays open but the optional question slides back down and the header changes back
        $( 'fieldset.point-of-contact-question' ).slideDown();
        $( '#point-of-contact-header' ).text( 'Additional point of contact' );
      }
      else {
        // When "someone else" is not selected and the consumer hasn't said yes in the "Point of contact" section, everything returns to the default
        $( 'fieldset.point-of-contact' ).slideUp();
        $( 'fieldset.point-of-contact-question' ).slideDown();
        $( '#point-of-contact-header' ).text( 'Additional point of contact' );
      }
    }
  } );

  // ADDITIONAL INFO FOR TYPE OF POINT OF CONTACT.
  // point-of-contact-identity.

  $( '#consumer1-identity' ).hide();
  $( '#addcon-phone-number' ).hide();
  $( '#addcon-email-helper' ).hide();
  $( '#poc-email-helper' ).hide();
  $( '#poc-phone-number' ).hide();
  // $( '#poc-disclosure' ).hide();

  $( '#ans-poc-other-who' ).slideUp();
    $( '#point-of-contact-identity' ).on( 'change', function(){
    var poctype = $(this).val();
    $( '#ans-poc-other-who' ).slideDown();
    $( '#ans-poc-other-who-spacer' ).slideUp();

    /* alert(poctype); */

    // Change out label for additional info field based on the user's selection for "Relationship to consumer"
    $( '#ans-poc-other-who' ).show();

    switch ( poctype ) {

      case 'family-member':
        $( '#cr-poc-other-who-label' ).text( 'Type of family member' );
        break;

      case 'friend':
        $( '#cr-poc-other-who-label' ).text( 'Type of friend' );
        $( '#ans-poc-other-who' ).hide();
        break;

      case 'attorney':
        $( '#cr-poc-other-who-label' ).text( 'Law firm or practice' );
        break;

      case 'gov-employee':
        $( '#cr-poc-other-who-label' ).text( 'Agency or organization' );
        break;

      case 'advocate':
        $( '#cr-poc-other-who-label' ).text( 'Organization name' );
        break;

      case 'housing-counselor':
        $( '#cr-poc-other-who-label' ).text( 'Organization name' );
        break;

      case 'other':
        $( '#cr-poc-other-who-label' ).text( 'Type of relationship' );
        break;

      default:
        $( '#cr-poc-other-who-label' ).text( 'Organization name' );
    }
  } );

  $( '#cr-add-consumer-full' ).change( function() {
    if ( $ ( '#cr-add-consumer-full' ).is( ':checked' ) ) {
      $( '#addcon-optional-status' ).text( '' );
      $( '#addcon-email-helper' ).slideDown();
      $( '#addcon-phone-number' ).slideDown();
      $( '.additional-consumer-email' ).removeClass( 'cr-question-last' );
    } else {
      $( '#addcon-optional-status' ).text( '(Optional)' );
      $( '#addcon-email-helper' ).slideUp();
      $( '#addcon-phone-number' ).slideUp();
      $( '.additional-consumer-email' ).addClass( 'cr-question-last' );
    }
  } );

  $( '#cr-add-poc-full' ).change( function() {
    if ( $( '#cr-add-poc-full' ).is( ':checked' ) ) {
      $( '#poc-phone-number' ).slideDown( 400 );
      $( '#poc-email-helper' ).slideDown();
      //$( '#poc-disclosure' ).slideDown();
      $( '.poc-email-address' ).removeClass( 'cr-question-last' );
    } else {
      $( '#poc-phone-number' ).slideUp( 400 );
      // $( '#poc-disclosure' ).slideUp();
      $( '#poc-email-helper' ).hide();
      $( '.poc-email-address' ).addClass( 'cr-question-last' );
    }
  } );

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

    }, 11);
  }
}

module.exports = {
  init: init
};
