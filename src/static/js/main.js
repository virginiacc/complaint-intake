'use strict';

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
