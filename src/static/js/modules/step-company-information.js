'use strict';

var companiesAutocomplete = require( './companies-autocomplete' );
var internationalAddresses = require( './international-addresses' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  companiesAutocomplete.init();
  internationalAddresses.init();

  // Show/hide follow-up info when certain radio buttons are selected
  $( '.cr-radios .radio input' ).on( 'change', function() {
    var $container = $( this ).parents( '.cr-radios' );
    $( this ).parent().addClass( 'selected' );
    $( '.cr-radios .radio input:not(:checked)' ).parent().removeClass( 'selected' );

    if ( $container ) {
      if ( $container.find( 'input.yes' ).is( ':checked' ) ) {
        $container.find( '.radio-follow-up .yes' ).show();
        $container.find( '.radio-follow-up .no' ).hide();
      } else {
        $container.find( '.radio-follow-up .yes' ).hide();
        $container.find( '.radio-follow-up .no' ).show();
      }
    }
  } );

  // Show/hide sections of Company Info.
  var _additionalCompanyProduct;
  $( 'fieldset.additional-company' ).hide();

  $( '.add-company-yes' ).on( 'change', function(){
    if ( $( '.add-company-yes' ).is( ':checked' ) ) {
      $( 'fieldset.additional-company' ).slideDown( 400 );
      // Hide company name initially.
      $( 'fieldset.additional-company.company-name-fieldset-3' ).hide();

      $( '#additional-consumer-identity' ).val( 'Select one...' );

      $( '#additional-consumer-identity' ).on( 'change', function() {
        var product = document.querySelector( '#additional-consumer-identity' ).value;
        $( '#additional-company-div .identify-product-options' ).remove();
        if ( product === 'Select one...' ) {
          $( 'fieldset.additional-company.company-name-fieldset-3' ).slideUp( 400 );
        } else {
          $( 'fieldset.additional-company.company-name-fieldset-3' ).slideDown( 400 );
          $( '#company3-forward' ).prop( 'checked', false );
          $( '#forward-company3' ).hide();

          var $productOption;
          switch ( product ) {
            case 'mortgage':
              $productOption = $( '#identify-mortgage-company' ).clone();
            break;

            case 'student_loan':
              $productOption = $( '#identify-student-loan-company' ).clone();
            break;

            case 'vehicle_loan':
              $productOption = $( '#identify-vehicle-loan-company' ).clone();
            break;

            case 'consumer_loan':
              $productOption = $( '#identify-storefront-services-company' ).clone();
            break;

            case 'card':
              $productOption = $( '#identify-most-prepaids-company' ).clone();
            break;

            case 'checking':
              $productOption = $( '#identify-checking-savings-company' ).clone();
            break;

            case 'money_trans':
              $productOption = $( '#identify-money-transfer-company' ).clone();
            break;

            case 'credit_reporting':
              $productOption = $( '#identify-credit-reporting-company' ).clone();
            break;

            case 'debt':
              $productOption = $( '#identify-debt-collection-company' ).clone();
            break;
          }
          $productOption.attr( 'id' , '');
          $productOption.appendTo( $( '#additional-company-div .cr-fieldset' )[0] );
          $productOption.find( '.identify-account' ).on( 'change', function() {
            if ( $( '.identification-type' ).is( ':checked' ) ) {
              internationalAddresses.initOptions( this );
            }
          } );
          _additionalCompanyProduct = product;
        }
      } );
    }
  } );

  $( '.add-company-no' ).on( 'change', function(){
    if ( $( '.add-company-no' ).is( ':checked' ) ) {
      $( 'fieldset.additional-company' ).slideUp( 400 );
      $( '#additional-company-div .identify-product-options' ).slideUp( 400 );
    }
  } );

  // Show/hide helper text when consumer chooses "I want a response from this company.
  $( 'fieldset.identify-product-options' ).hide();
  $( '.company-1-checkbox' ).hide();
  $( '#forward-company2' ).hide();
  $( '#forward-company3' ).hide();

  $( '#company2-forward' ).on( 'change', function() {
    if ( $( '#company2-forward' ).is( ':checked' ) ) {
      $( '#forward-company2' ).slideDown( 400 );
      $( '#identify-credit-reporting-company' ).slideDown( 400 );
    } else {
      $( '#forward-company2' ).slideUp( 400 );
      $( '#identify-credit-reporting-company' ).slideUp( 400 );
    }
  } );

  $( '#company3-forward' ).on( 'change', function() {
    if ( $( '#company3-forward' ).is( ':checked' ) ) {
      $( '#forward-company3' ).slideDown( 400 );
      $( '#additional-company-div .identify-product-options' ).slideDown( 400 );
    } else {
      $( '#forward-company3' ).slideUp(400);
      $( '#additional-company-div .identify-product-options' ).slideUp( 400 );
    }
  } );

  // Show/hide product identification options.
  $( 'fieldset.identify-options' ).hide();
  $( '.company_verification_fieldset' ).hide();

  if ( !window.env ) {
    setTimeout( function() {
      var product = webStorageProxy.getItem( 'product_selected', localStorage );
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage );
      var issue = webStorageProxy.getItem( 'issue_selected', localStorage );

      $( '#company-type-2' ).hide();

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
          $( '#company-type-2' ).show();
          $( '#identify-debt-collection-company' ).appendTo( '#company-type-1' );
          break;

        default:
          $( '#company-intro-1' ).text( 'Company information' );
          $( '#company-type-1' ).show();
      }

      switch ( subproduct ) {
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

        // Debt collection subproducts.
        case 'credit-card-debt-collection':
          $( '#company-intro-2' ).text( 'Credit card company' );
          break;

        case 'mortgage-debt-collection':
          $( '#company-intro-2' ).text( 'Mortgage company' );
          break;

        case 'medical-debt-collection':
          $( '#company-intro-2' ).text( 'Medical company' );
          break;

        case 'payday-loan-debt-collection':
          $( '#company-intro-2' ).text( 'Payday loan company' );
          break;

        case 'auto-debt-collection':
          $( '#company-intro-2' ).text( 'Auto company' );
          break;

        case 'federal-student-debt-collection':
          $( '#company-intro-2' ).text( 'Federal student loan company' );
          break;

        case 'non-federal-student-debt-collection':
          $( '#company-intro-2' ).text( 'Non-federal student loan company' );
          break;

        case 'other-debt-collection':
          $( '#company-intro-2' ).text( 'Other debt company' );
          break;

        case 'unknown-debt-collection':
          $( '#company-intro-2' ).text( 'Unknown company' );
          break;
      }

      switch ( issue ) {
        case 'credit_reporting':
          $( '#company-intro-2' ).text( 'Credit reporting company' );
          $( '#company-type-2' ).show();
          $( '#identify-credit-reporting-company' ).appendTo( '#company-type-2' );
          break;
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
