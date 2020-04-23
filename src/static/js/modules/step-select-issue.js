'use strict';

var disputeCaseNumber = require( './dispute-case-number' );
var webStorageProxy = require( '../modules/util/web-storage-proxy' );

function init() {
  disputeCaseNumber.init();

  $( '.all-subissues' ).hide();
  $( '.debt-collection-zombie' ).hide();
  $( '.credit-reporting-zombie' ).hide();
  $( '#debt_collection_subsubissues' ).hide();
  $( '#credit_reporting_subsubissues' ).hide();
  $( '#zombie_subissues_sublabel' ).hide();
  $( '.resolution-options' ).hide();
  $('.mid-form-note').hide();

  $( '#select_issue .a-radio' ).on( 'change', function() {
    $( '.resolution-options' ).slideDown();
      $('.mid-form-note').slideDown();

    if ( $( '#select_issue .issue' ).is( ':checked' ) ) {
      var $el = $(this);
      $( '.all-subissues' ).hide();
      $( '.debt-collection-zombie' ).hide();
      $( '.credit-reporting-zombie' ).hide();
      $( '.subissue_label' ).hide();
      $( '#zombie_subissues_sublabel' ).hide();
      var subissuetype = $( this ).attr( 'id' );
      console.log(subissuetype);
      if ( $el.hasClass('debt-collection-issue') ) {
          subissuetype = 'debt_collection';
      } else if ( $el.hasClass('credit-reporting-issue') ) {
          subissuetype = 'credit_reporting';
      }
      console.log(subissuetype);
      $( '#select_issue .active' ).removeClass( 'active' );
      $( '.' + subissuetype + '_subissues' ).fadeIn( 'fast' );
      $( '#' + subissuetype + '_subissues' ).slideDown( 200 );
      $( this ).addClass( 'active' );
    }
  } );

  $( '#select_subissue .a-radio' ).on( 'change', function() {
    if ( $( '#select_subissue .issue' ).is( ':checked' ) ) {
      $( '.subsubissues' ).hide();
      $( '#select_subissue .active' ).removeClass( 'active' );
      $( '#zombie_subissues_sublabel' ).slideDown();
      $( '#' + $(this).attr( 'id' ) + '_subissues_sublabel' ).slideDown();
      $( '#' + $(this).attr( 'id' ) + '_subissues' ).slideDown( 200 ).addClass( 'subsubissues' );
      $(this).addClass( 'active' );
    }
  } );

  $( '.all-subissues .a-radio' ).on( 'change', function() {

    if ( $( '.a-radio' ).is( ':checked' ) ) {
      $( this ).parents( '.all-subissues' ).find( '.a-radio' ).removeClass( 'active' );
      $( this ).addClass( 'active' );
    }
  } );

  $( '.subsubissues .a-radio' ).on( 'change', function() {
    if ( $( '.a-radio' ).is( ':checked' ) ) {
      $( '.subsubissues .a-radio' ).removeClass( 'active' );
      $( this ).addClass( 'active' );
    }
  } );

  $( '.resolution-attempt' ).on( 'change', function() {
    $( this ).toggleClass( 'active' );
  } );

  /**
   * Shows and hides mortgage subissue followup questions based on answers to
   * preceeding trigger questions
   */
  $( '.mortgage-servicer-subissue-question__radio' ).on( 'change', '.a-radio', function() {
    var mortageQuestionModel = {};
    var thisQuestionID = $( this ).parents( '.mortgage-servicer-subissue-question__radio' ).attr( 'id' );
    var $folowupQuestions = $( '[data-followup-to*="' + thisQuestionID + '"]' );
    $( '.mortgage-servicer-subissue-question__radio' ).each( function() {
      var questionID = $( this ).attr( 'id' );
      var questionValue = $(this).find( '.a-radio:checked' ).val();
      mortageQuestionModel[ questionID ] = questionValue;
    } );
    $folowupQuestions.each( function() {
      var $question = $( this );
      var triggerQuestionIDs = $question.attr( 'data-followup-to' ).split( ' ' );
      // If ANY of the follow-up question's triggers are answered "yes", show the
      // follow-up. Otherwise, hide the follow-up.
      for (var i = 0; i < triggerQuestionIDs.length; i++) {
        var triggerAnswer = mortageQuestionModel[ triggerQuestionIDs[ i ] ];
        if ( triggerAnswer === 'yes' ) {
          $question.slideDown();
          break;
        }
        $question.slideUp();
      };
    } );
  } );

  if( !window.env ){
    setTimeout( function() {
      // grab stuff from step 1
      var subproduct = webStorageProxy.getItem( 'subproduct_selected', localStorage );
      if ( subproduct ) {
        var subproductname = subproduct.replace('-', ' ').replace('-', ' ').replace('-', ' ').replace('-', ' ').replace('-', ' ');
        $( '#product-name-in-subhead' ).text( subproductname );
      }
      var issuelist = webStorageProxy.getItem( 'issue_list', localStorage );
      $( '.all-topissues' ).hide();
      $( '#issue_options_' + issuelist ).slideDown( 200 );
      // $('#issue_options_' + issuelist).show();
    }, 1 );

    setTimeout( function() {
      $( '#select_issue .all-topissues .a-radio' ).click( function() {
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
