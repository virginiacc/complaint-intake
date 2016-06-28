'use strict';

var Modal = require( './organisms/Modal' );

// Handle international addresses.
var addressHandlebars = require( '../tmpl/address.handlebars' );

var addressTemplates = document.querySelectorAll( '.address-template' );
var addressContainerDom;
var countryDropdownDom;
var addressMap = {};
for ( var i = 0, len = addressTemplates.length; i < len; i++ ) {
  addressContainerDom = addressTemplates[i];
  _initAddress( addressContainerDom, i );
}

function _initAddress( addressDom, id ) {
  addressDom.innerHTML = addressHandlebars( { id: id } );
  countryDropdownDom = addressDom.querySelector( '#address-country-' + id );
  addressMap[countryDropdownDom.id] = addressDom;
  countryDropdownDom.addEventListener( 'change', _countryChanged );
}

function _countryChanged( evt ) {
  var tmp = evt.target.id.split( '-' );
  var id = tmp[tmp.length-1];
  var opts = { id: id };
  opts[ 'country' + evt.target.value ] = true;
  // 100 is the value code for the USA.
  if ( evt.target.value !== '100' ) {
    opts.isInternational = true;
  }
  addressContainerDom = addressMap[evt.target.id];
  countryDropdownDom = addressContainerDom.querySelector( '#address-country-' + id );
  countryDropdownDom.removeEventListener( 'change', _countryChanged );
  addressContainerDom.innerHTML = addressHandlebars( opts );
  countryDropdownDom = addressContainerDom.querySelector( '#address-country-' + id );
  countryDropdownDom.addEventListener( 'change', _countryChanged );
}

$( '.identify-account' ).on( 'change', function() {
  if ( $( '.identification-type' ).is( ':checked' ) ) {
    var identifytype = $(this).attr( 'value' );
    var companytype = $(this).closest( 'fieldset' ).attr( 'id' );
    $( 'fieldset.identify-options.active-' + companytype ).hide();
    $( '.identify-account label.active' ).removeClass( 'active' );
    $( '#fieldset_repository fieldset.' + identifytype )
      .clone().appendTo( $( this ).closest( 'fieldset' ) )
        .slideDown( 'fast', function() {
          var address = this.querySelector( '.address-template' );
          if ( address ) {
            var id = address.id.substring( address.id.length-1 );
            _initAddress( address, id );
          }
        } ).addClass( 'active-' + companytype );
  }
} );

// Handle modals.
function _showModal( content ) {
  var modal = new Modal();
  modal.create( content );

  return modal.init();
}

var privacyLink = document.querySelector( '#privacy' );
var ombLink = document.querySelector( '#omb' );
var consentLink = document.querySelector( '#narrative-consent-modal' );
var saveContinueLink = document.querySelector( '#save-and-continue-later-link' );

// Global links.
privacyLink.addEventListener( 'click', _showPrivacyModal );
ombLink.addEventListener( 'click', _showOmbLink );
saveContinueLink.addEventListener( 'click', _showSaveContinue );

// Step 3 link.
if ( consentLink &&
     saveContinueLink ) {
  consentLink.addEventListener( 'click', _showConsent );
}

function _showPrivacyModal( evt ) {
  evt.preventDefault();
  _showModal( {
    header: 'Privacy act statement',
    body:   '<p>The information you provide will permit the Consumer Financial Protection Bureau to respond to your complaint or inquiry about companies and services we supervise. Information about your complaint or inquiry (including your personally identifiable information) may be shared:</p><p>• with the entity that is the subject of your complaint;</p><p>• with third parties as necessary to get information relevant to resolving a complaint;</p><p>• with a court, a party in litigation, a magistrate, an adjudicative body or administrative tribunal in the course of a proceeding, or the Department of Justice;</p><p>• with other federal or state agencies or regulatory authorities for enforcement and statutory purposes; and</p><p>• with contractors, agents, and others authorized by the CFPB to receive this information.</p><p>We may also share your complaint or inquiry (but not your personally identifiable information) with the public through a public complaint database.</p><p>This collection of information is authorized by 12 U.S.C. § 5493.</p><p>You are not required to file a complaint or share any identifying information, including your Social Security number, and you may withdraw your complaint at any time. However, if you do not include the requested information, the CFPB may not be able to act on your complaint.</p>'
  } );
}

function _showOmbLink( evt ) {
  evt.preventDefault();
  _showModal( {
    header: 'OMB #3170-0011',
    body:   'An agency may not conduct or sponsor, and a person is not required to respond to, a collection of information unless the collection of information displays a valid control number assigned by the Office of Management and Budget (OMB). The OMB control number for this collection is 3170-0011, expires 11/30/2014.'
  } );
}

function _showConsent( evt ) {
  evt.preventDefault();
  _showModal( {
    header: 'Include your description of what happened on consumerfinance.gov',
    body:   '<p>When you submit a complaint through the CFPB, you can choose to publish your description of what happened in the Consumer Complaint Database on our website, consumerfinance.gov. This will help researchers, journalists, and other consumers understand the financial marketplace though reading your first-hand account.</p> <p>You should avoid including personal information, such as names, addresses, and account numbers in the content of your description, but we will also conduct a series of automated and manual reviews to remove remaining personal information before publishing. The following example highlights information that would be removed:</p> <p id="scrubbed-narrative">We took out a private education loan for our daughter <span class="redacted-text">XXXXXX</span> while she was attending the <span class="redacted-text">XXXXXX</span> University in <span class="redacted-text">XXXXXX</span>, MA. This loan went into default after she transferred to a community college in <span class="redacted-text">XXXXXX</span>, MA. Our lender received notice that she was no longer a full-time student in <span class="redacted-text">XX</span>/<span class="redacted-text">XX</span>/2011. Then our younger son <span class="redacted-text">XXXXXXX</span> became very sick and we could no longer make the monthly payments on our daughter’s loan. We tried to set up a new payment plan to get us back on track, but the servicer won’t negotiate. We\'ve been paying what we can but we still haven\'t reduced any of the principal on the loan. </p>  <p>We monitor this process to ensure that all personal information is removed, but a small risk remains that something will be missed. We won’t publish your description until we have finished the process of removing personal information, so your description won’t appear in the database right away.</p> <p>Publishing your description on consumerfinance.gov is completely optional. If you authorize publication but change your mind, you can withdraw your authorization at any time by calling the CFPB help line at (855) 411-2372. Your description will then be removed the next time the database is updated.</p><p>Whether you choose to provide or withdraw your authorization will not affect how your complaint is handled.</p>'
  } );
}

function _showSaveContinue( evt ) {
  evt.preventDefault();
  _showCreateTab();
}

function _showCreateTab() {
  var modal = _showModal( {
    header: 'Create an account so you can continue later',
    body:   '<p>Log in or create an account and we will send you a link and a complaint ID number that you can use to finish submitting this complaint.</p>' +
            '<div id="save-options" class="select-product-or-issue select-save-method">' +
            '<label class="radio block save-options-label active">' +
            '<input name="radio_" type="radio" class="radio_input product save-options-radio save-with-email selected" value="save-with-email" checked/>' +
            'Create an account <br /></label>' +
            '<label class="radio block save-options-label">' +
            '<input id="log-in-btn" name="radio_" type="radio" class="radio_input save-options-radio product save-with-login" value="save-with-login" />' +
            'Log in <br /></label> </div> <hr class="save-method-hr" />' +
            '<div id="save-with-email" class="save-method">' +
            '<div class="span3 cr-label cr-save-option email">' +
            '<label for="con1-email">Email address or Phone number ' +
            '<div class="is-required">Answer Required</div></label>' +
            '<input type="email" name="cr-email2" id="cr-email2_2356852120719850" placeholder="" class="input-large left">' +
            '<p>We will send a link to this email address to continue this complaint</p></div>' +
            '<div class="span3 cr-label cr-save-option">' +
            '<label for="con1-email">Create a password<div class="is-required">Answer Required</div></label>' +
            '<input type="email" name="cr-password" id="cr-email2_2356852120719850" placeholder="" class="input-large left">' +
            '<p>Include letters and numbers, at least 8 characters</p></div>' +
            '</div>',
    button: 'Create an account and save progress'
  } );

  var dom = modal.getDom().container;
  var tab = dom.querySelector( '#log-in-btn' );
  tab.addEventListener( 'click', function() {
    modal.destroy();
    _showLoginTab();
  } );
}

function _showLoginTab() {
  var modal = _showModal( {
    header: 'Create an account so you can continue later',
    body:   '<p>Log in or create an account and we will send you a link and a complaint ID number that you can use to finish submitting this complaint.</p>' +
            '<div id="save-options" class="select-product-or-issue select-save-method">' +
            '<label class="radio block save-options-label">' +
            '<input id="create-account-btn" name="radio_" type="radio" class="radio_input product save-options-radio save-with-email selected" value="save-with-email"/>' +
            'Create an account <br /></label>' +
            '<label class="radio block save-options-label active">' +
            '<input name="radio_" type="radio" class="radio_input save-options-radio product save-with-login" value="save-with-login" checked/>' +
            'Log in <br /></label> </div> <hr class="save-method-hr" />' +
            '<div id="save-with-login" class="save-method">' +
            '<p>If you have submitted a complaint to the CFPB in the past, log in to save this complaint to your account. </p>' +
            '<div class="span3 cr-label cr-save-option email"><label for="con1-email">Email address or phone number <div class="is-required">Answer Required</div></label>' +
            '<input type="email" name="cr-email2" id="cr-email2_2356852120719850" placeholder="" class="input-large left"></div>' +
            '<div class="span3 cr-label cr-save-option"><label for="con1-email">Password <div class="is-required">Answer Required</div></label>' +
            '<input type="email" name="cr-password" id="cr-email2_2356852120719850" placeholder="" class="input-large left"></div>' +
            '</div>',
    button: 'Log in and save progress'
  } );

  var dom = modal.getDom().container;
  var tab = dom.querySelector( '#create-account-btn' );
  tab.addEventListener( 'click', function() {
    modal.destroy();
    _showCreateTab();
  } );
}
