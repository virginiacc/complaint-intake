/**
 * Submit a complaint
 */

/**
 * Note: This JS is not eloquent. It was quickly written to demonstrate
 * interactions for the functional prototype. It should be modularized before
 * entering production.
 */

$(function() {

  /**
   *  Highlight selected radios on DOM load
  **/
  $('.cr-radios .radio input').each(function(){
    if ( $(this).is(':checked') ) {
      $(this).parent().addClass('selected');
    }
  });

  /**
   *  Make the left nav sticky using Bootstrap's affix plugin
  **/
  $('#sticky-nav').affix({offset: 110});


  /**
   * "Why do we need this?"" toggles
   */
  $('.cr-why').on('click', function(e) {
    var explanation = $(this).attr('href'),
        $explanation = $(explanation);
    e.preventDefault();
    $(this).toggleClass('active');
    $explanation.slideToggle(200);
  });

  /**
   * Toggle follow-up text
   */
  $('#cr-question-1').on('change', '#cr-describe-issue', function(){
    var followUp = $('#cr-question-1').find(':selected').attr('data-follow-up'),
        $followUp = $('.' + followUp);
    if (followUp) {
      $('.follow-up').hide();
      $followUp.show();
    } else {
      $('.follow-up').hide();
    }
  });

  /**
   * Display characters left
   */
  $('.cr-count-me').on('keyup', function() {
    var $this = $(this),
        maxLength = parseInt($this.attr('maxlength')),
        $counter = $('.char-count[data-count-watch=' + $this.attr('id') + '] span'),
        currentLength = $this.val().length;

    $counter.text(maxLength - currentLength);
  });

  /**
   * Autocomplete company names
   */
  // $('input.cr-company-search, input.cr-diff-company-search').typeahead({
  //   source: companies,
  //   limit: 10
  // });

  /**
   * When a country other than USA is selected, switch zip/state address fields
   */
  $('select.country').on('change', function(){
    var country = $(this).val(),
        $international = $(this).parents('.cr-primary-container').find('.international'),
        $domestic = $(this).parents('.cr-primary-container').find('.domestic');

        if ( country === 'US' ) {
          $international.hide();
          $domestic.show();
        } else {
          $international.show();
          $domestic.hide();
        }
  });

  /**
   * Add another phone number button
   */
  $('.add-number').on('click', function() {
    var div = document.createElement('div'),
        phoneContainer = $(this).parent(),
        phone = $('.cr-phone').first().html();
    phoneContainer.find('.cr-phone').removeClass('last').addClass('first');
    $(div).append(phone).addClass('cr-phone last');
    $(this).before(div);
    if ( phoneContainer.find('.cr-phone').length >= 2 ) {
      $(this).remove();
    }
    return false;
  });

  /**
   * Show/hide info of debt origin company
   */
  $('input.cr-company-search').on('keyup', function(){
    if ( $(this).val().length && $(this).val().length > 0 ) {
      $('.cr-company-address').slideDown(400);
    } else {
      $('.cr-company-address').slideUp(300);
    }
  });

  /**
   * Show/hide info of creditor company
   */
  $('input.cr-diff-company-search').on('keyup', function(){
    if ( $(this).val().length && $(this).val().length > 0 ) {
      $('.cr-diff-company-address').slideDown(400);
    } else {
      $('.cr-diff-company-address').slideUp(300);
    }
  });

  /**
   * Hide creditor company info when "I do not know the company name"
   * is checked
   */
  $('.cr-hide-diff-company').on('change', function(){
    if ( $('.cr-hide-diff-company').is(':checked') ) {
      $('.cr-diff-company-address').slideUp(200);
      $('.cr-diff-company-search').attr('disabled', 'disabled').css('backgroundColor', '#eee');
    } else {
      if ( $('.cr-diff-company-search').val().length > 0 ) {
        $('.cr-diff-company-address').slideDown(200);
      }
      $('.cr-diff-company-search').removeAttr('disabled').css('backgroundColor', '#fff');
    }
  });

  /**
   * Hide company info when "I do not know the debt collection company name"
   * is checked
   */
  $('.cr-hide-company').on('change', function(){
    if ( $('.cr-hide-company').is(':checked') ) {
      $('.cr-company-address').slideUp(200);
      $('.cr-company-search').attr('disabled', 'disabled').css('backgroundColor', '#eee');
    } else {
      if ( $('.cr-company-search').val().length > 0 ) {
        $('.cr-company-address').slideDown(200);
      }
      $('.cr-company-search').removeAttr('disabled').css('backgroundColor', '#fff');
    }
  });

  /**
   * Show/hide info of debt origin company
   */
  $('#debt-origin input').on('change', function(){
    if ( $('.cr-diff-company').is(':checked') ) {
      $('.cr-diff-company-info').slideDown(400);
    } else {
      $('.cr-diff-company-info').slideUp(300);
    }
  });

  /**
   * Show/hide military status
   */
  $('.cr-servicemember input').on('change', function(){
    if ( $('.cr-need-servicemember-info').is(':checked') ) {
      $('.cr-servicemember-info, .cr-military-status').slideDown(400);
      $('.cr-military-status hr').hide();
    } else if ( $('.cr-need-military-status').is(':checked') ) {
      $('.cr-military-status').slideDown(400);
      $('.cr-servicemember-info').slideUp(300);
      $('.cr-military-status hr').show();
    } else {
      $('.cr-servicemember-info, .cr-military-status').slideUp(300);
    }
  });

  /**
   * Show/hide follow-up info when certain radio buttons are selected
   */
  $('.cr-radios .radio input').on('change', function(){
    var $container = $(this).parents('.cr-radios');
    $(this).parent().addClass('selected');
    $('.cr-radios .radio input:not(:checked)').parent().removeClass('selected');
    if ( $container ) {
      if ( $container.find('input.yes').is(':checked') ) {
        $container.find('.radio-follow-up .yes').show();
        $container.find('.radio-follow-up .no').hide();
      } else {
        $container.find('.radio-follow-up .yes').hide();
        $container.find('.radio-follow-up .no').show();
      }
    }
  });

  /**
   * Jump to next page when clicking continue button
   */
  $('button.btn-arrow').on('click', function(){
    var next = $(this).data('next-step');
    if (next && next !== 2) {
      document.location.href = 'step-' + next + '.html';
    }
  });

  /**
   * Some super ugly faux form validation on the page 1 questions to
   * demonstrate desired functionality we'd want from form validation
   */
  $el = $('#cr-answer-1 input, #cr-question-2 .follow-up, #cr-answer-3, #cr-answer-4');

  $el.on('change', function(){
    var self = this,
        $validator = $(this).parents('.cr-question').find('.cr-validate');
    $validator.removeClass('success failure').addClass('loading');
    window.setTimeout(function(){
      if ($(self).find('textarea').length === 0 || $(self).find('textarea').val().length > 0) {
        $validator.removeClass('loading failure').addClass('success');
        $(self).find('textarea').removeClass('failure');
      } else {
        $validator.removeClass('loading success').addClass('failure');
        $(self).find('textarea').removeClass('success').addClass('failure');
      }
    }, 1000);

  });

  $('.cr-continue button[data-next-step=2]').on('click', function(){
    var numPassed = 0;

    // check if radio was selected in first question
    if ( $('#cr-describe-issue').val() ) {
        numPassed++;
        $('#cr-question-1 .cr-validate').removeClass('failure').addClass('success');
        $('#cr-question-1 .cr-validate-message').hide();
    } else {
        $('#cr-question-1 .cr-validate').removeClass('success').addClass('failure');
        $('#cr-question-1 .cr-validate-message').show();
    }

    // check if text was entered in third question's textarea
    if ( $('#cr-answer-3 textarea').val() && $('#cr-answer-3 textarea').val().length > 0 ) {
        numPassed++;
        $('#cr-answer-3 .cr-validate-message').hide();
    } else {
        $('#cr-answer-3 textarea').addClass('failure');
        $('#cr-answer-3 .cr-validate').removeClass('success').addClass('failure');
        $('#cr-answer-3 .cr-validate-message').show();
    }

    // check if text was entered in fourth question's textarea
    if ( $('#cr-answer-4 textarea').val() && $('#cr-answer-4 textarea').val().length > 0 ) {
        $('#cr-answer-4 .cr-validate-message').hide();
        numPassed++;
    } else {
      $('#cr-answer-4 textarea').addClass('failure');
      $('#cr-answer-4 .cr-validate').removeClass('success').addClass('failure');

      $('#cr-answer-4 .cr-validate-message').show();
    }

    if (numPassed >= 3) {
      document.location.href = 'step-2.html';
    }else{
      // show error panel
      $(".error-panel").show();

      // scroll to top
      $("html, body").animate({ scrollTop: "0px" });
    }
  });

  /**
     * START EXCITING BENCODE
     */

  /**
     * Show/hide products
     */

$('#select_subproduct').hide();
$('.subproduct_sect').hide();
$('.subproduct_label').hide();
$('#payday_questions').hide();
$('#vehicle_questions').hide();
$('#mortgage_servicer_questions').hide();



    $('.radio_input').on('change', function(){

      if ( $('.product').is(':checked') ) {
    $('.subproduct_label').hide();
    $('.subproduct_sect').hide();
    $('.subproduct_sect').hide();
    $('#student_questions').hide();
    $('#payday_questions').hide();
    $('#vehicle_questions').hide();
        $('#subproduct_options label.active').removeClass('active');
        $('.product-specific-questions label.active').removeClass('active');

    $('#product_options label.active').removeClass('active');
        $('#select_subproduct').fadeIn('fast');
        $('#' + $(this).attr('id') + '_label').fadeIn('fast');
        $('#' + $(this).attr('id') + '_products').slideDown(200);
        $(this).closest('label').addClass('active');
      }

    });

    $('#subproduct_options .radio_input_subpro').on('change', function(){

      if ( $('.radio_input_subpro').is(':checked') ) {
        $('#subproduct_options label.active').removeClass('active');
        $('.product-specific-questions label.active').removeClass('active');
        $(this).closest('label').addClass('active');
        if ( $(this).parent().attr('addtlquestions') == 'payday'){
        $('#payday_questions').slideDown().show();
        $('#payday_questions .follow-up').hide();
        } else {
         $('#payday_questions').hide();
        }
        if ( $(this).parent().attr('id') == 'federal-student-loan'){
        $('#student_questions').slideDown().show();
        } else if ( $(this).parent().attr('id') == 'non-federal-student-loan'){
        $('#student_questions').slideDown().show();
        } else {
         $('#student_questions').slideUp();

        }
        if ( $(this).parent().attr('id') == 'vehicle-loan'){
        $('#vehicle_questions').slideDown().show();
        } else if ( $(this).parent().attr('id') == 'vehicle-lease'){
        $('#vehicle_questions').slideDown().show();
        } else {
         $('#vehicle_questions').slideUp();
        }
      }
    });

     $('.product-specific-questions .radio_input_subpro').on('change', function(){

      if ( $('.radio_input_subpro').is(':checked') ) {
        $('.product-specific-questions label.active').removeClass('active');
        $(this).closest('label').addClass('active');
        if ( $(this).parent().attr('id') == 'at-store' ){
        $('#store-questions').slideDown().show();
        } else {
         $('#store-questions').hide();
        }
        if ( $(this).parent().attr('id') == 'online' ){
        $('#online-questions').slideDown().show();
        } else {
         $('#online-questions').hide();
        }

      }
     });


/* $('.select-issue-page .select-product-or-issue').hide(); */

$('.all-subissues').hide();
$('.debt-collection-zombie').hide();
$('.credit-reporting-zombie').hide();
$('#debt_collection_subsubissues').hide();
$('#credit_reporting_subsubissues').hide();
$('#zombie_subissues_sublabel').hide();
$('.resolution-options').hide();

    $('#select_issue .radio_input').on('change', function(){
    $('.resolution-options').slideDown();
      if ( $('#select_issue .issue').is(':checked') ) {
    $('.all-subissues').hide();
    $('.debt-collection-zombie').hide();
    $('.credit-reporting-zombie').hide();
    $('.subissue_label').hide();
    $('#zombie_subissues_sublabel').hide();
    var subissuetype = $(this).attr('id');
    $('#select_issue label.active').removeClass('active');
        $('.' + $(this).attr('id') + '_subissues').fadeIn('fast');
        $('#' + $(this).attr('id') + '_subissues').slideDown(200);
        $(this).closest('label').addClass('active');
      }
    });


    $('#select_subissue .radio_input').on('change', function(){

      if ( $('#select_subissue .issue').is(':checked') ) {
    $('.subsubissues').hide();
    $('#select_subissue label.active').removeClass('active');
    $('#zombie_subissues_sublabel').slideDown();
        $('#' + $(this).attr('id') + '_subissues_sublabel').slideDown();
        $('#' + $(this).attr('id') + '_subissues').slideDown(200).addClass('subsubissues');
        $(this).closest('label').addClass('active');


      }
    });

    $('.all-subissues .radio_input').on('change', function(){

      if ( $('.radio_input').is(':checked') ) {
        $(this).parents('.all-subissues').find('label').removeClass('active');
        $(this).closest('label').addClass('active');
      }
    });


    $('.subsubissues .radio_input').on('change', function(){

      if ( $('.radio_input').is(':checked') ) {
        $('.subsubissues label').removeClass('active');
        $(this).closest('label').addClass('active');
      }
    });


  $('.resolution-attempt').on('change', function(){
      $(this).closest('label').toggleClass('active');
  });

/**
 * Shows and hides mortgage subissue followup questions based on answers to
 * preceeding trigger questions
 */
$( '.mortgage-servicer-subissue-question__radio' ).on( 'change', '.radio_input', function() {
  var mortageQuestionModel = {};
  var thisQuestionID = $( this ).parents( '.mortgage-servicer-subissue-question__radio' ).attr('id');
  var $folowupQuestions = $( '[data-followup-to*="' + thisQuestionID + '"]' );
  $( '.mortgage-servicer-subissue-question__radio' ).each( function() {
    var questionID = $( this ).attr( 'id' );
    var questionValue = $(this).find( '.radio_input:checked' ).val();
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

/*
///
show / hide issues
///
*/


/*

autofocus what happened

*/

$('body.whathappened #what-happened').focus();

/*


/////////////
/////////////
/////////////
IDENTIFY COMPANIES PAGE
/////////////
/////////////
/////////////

*/

/*

Show/hide helper text when consumer chooses "I want a response from this company

*/


$('fieldset.identify-product-options').hide();
$('.company-1-checkbox').hide();

$('#forward-company2').hide()
$('#forward-company3').hide()



  $('#company2-forward').on('change', function(){
      if ( $('#company2-forward').is(':checked') ) {
        $('#forward-company2').slideDown(400);
      }
    });


  $('#company2-forward').on('change', function(){
      if ( !$('#company2-forward').is(':checked') ) {
        $('#forward-company2').slideUp(400);
      }
    });


  $('#company3-forward').on('change', function(){
      if ( $('#company3-forward').is(':checked') ) {
        $('#forward-company3').slideDown(400);
      }
    });


  $('#company3-forward').on('change', function(){
      if ( !$('#company3-forward').is(':checked') ) {
        $('#forward-company3').slideUp(400);
      }
    });

/*

Show/hide product identification options

*/


$('fieldset.identify-options').hide();

$('.company_verification_fieldset').hide();

/*
// MOVED TO static/js/main.js
// TODO: remove this block when it's verified form is working as expected.
$( '.identify-account' ).on( 'change', function() {
  if ( $( '.identification-type' ).is( ':checked' ) ) {
    var identifytype = $(this).attr( 'value' );
    var companytype = $(this).closest( 'fieldset' ).attr( 'id' );
    $( 'fieldset.identify-options.active-' + companytype ).hide();
    $( '.identify-account label.active' ).removeClass( 'active' );
    $( '#fieldset_repository fieldset.' + identifytype )
      .clone().appendTo( $( this ).closest( 'fieldset' ) )
        .slideDown().addClass( 'active-' + companytype );
  }
} );
*/

/*

Show/hide sections of Company Info

*/

$('fieldset.additional-company').hide();



   $('.add-company-yes').on('change', function(){
      if ( $('.add-company-yes').is(':checked') ) {
        $('fieldset.additional-company').slideDown(400);
      }
    });


   $('.add-company-no').on('change', function(){
      if ( $('.add-company-no').is(':checked') ) {
        $('fieldset.additional-company').slideUp(400);
      }
    });

/*

ASK FOR IDENTIFYING INFO AFTER COMPANY NAME IS PROVIDED

*/

/*


/////////////
/////////////
/////////////
YOUR INFORMATION PAGE
/////////////
/////////////
/////////////

*/

/*

Show/hide sections of Your Info

*/

$('fieldset.additional-consumer').hide();
$('fieldset.point-of-contact').hide();



   $('.add-consumer-yes').on('change', function(){
      if ( $('.add-consumer-yes').is(':checked') ) {
        $('fieldset.additional-consumer').slideDown(400);
        $('.cr-add-con label.active').removeClass('active');
        $(this).closest('label').addClass('active');

      }
    });


   $('.add-consumer-no').on('change', function(){
      if ( $('.add-consumer-no').is(':checked') ) {
        $('fieldset.additional-consumer').slideUp(400);
        $('.cr-add-con label.active').removeClass('active');
        $(this).closest('label').addClass('active');
      }
    });



   $('.add-poc-yes').on('change', function(){
      if ( $('.add-poc-yes').is(':checked') ) {
        $('fieldset.point-of-contact').slideDown(400);
        $('.cr-add-poc label.active').removeClass('active');
        $(this).closest('label').addClass('active');
      }
    });


  $('.add-poc-no').on('change', function(){
      if ( $('.add-poc-no').is(':checked') ) {
        $('fieldset.point-of-contact').slideUp(400);
        $('.cr-add-poc label.active').removeClass('active');
        $(this).closest('label').addClass('active');
      }
    });

// -------------------------------

    $('#debt-obtained input').on('change', function(){
      if ( $('.cr-debt-inperson').is(':checked') ) {
        $('.debt-website').slideUp(400);
        $('.debt-state').slideDown(400);
      } else if ( $('.cr-debt-online').is(':checked') ) {
        $('.debt-website').slideDown(400);
        $('.debt-state').slideUp(400);
      }
    });


    $('#relationship-to-person select').change(function(){
        if($('.ans-rel-other').is(':checked')){
          $('#ans-rel-other-who').slideDown();
        }else{
          $('#ans-rel-other-who').slideUp();
        }
    });


  $('#consumer-info-no-email').hide();
    $('#cr-no-email').change(function(){
        if($('#cr-no-email').is(':checked')){
          $('#consumer-info-no-email').slideDown();
        }else{
          $('#consumer-info-no-email').slideUp();
        }
    });

/* SLIDE DOWN ALTERNATIVE IDENTIFICATION METHODS */

    $('.identify-user').on('change', function(){

      if ( $('.identification-type').is(':checked') ) {
    var identifytype = $(this).attr('value');
    $('fieldset.identify-options.active').hide();
    $('.identify-options').removeClass('active');
        $('fieldset.' + identifytype).slideDown().addClass('active');
    if ( identifytype == 'someone-else') {
      // When "someone else" is selected, the "Point of contact" section slides down, the optional question slides up, and the header text changes
      $('fieldset.point-of-contact').slideDown();
          $('fieldset.point-of-contact-question').slideUp();
          $('#point-of-contact-header').text('Point of contact');
    }
    else if ( identifytype != 'someone-else' && $('.add-poc-yes').is(':checked') ) {
      // When "someone else" is not selected, but the consumer has already said "Yes" in the "Point of contact" section, the Point of contact section stays open but the optional question slides back down and the header changes back
          $('fieldset.point-of-contact-question').slideDown();
          $('#point-of-contact-header').text('Additional point of contact');
    }
    else {
      // When "someone else" is not selected and the consumer hasn't said yes in the "Point of contact" section, everything returns to the default
      $('fieldset.point-of-contact').slideUp();
          $('fieldset.point-of-contact-question').slideDown();
          $('#point-of-contact-header').text('Additional point of contact');
    }
      }
    });

/* ADDITIONAL INFO FOR TYPE OF POINT OF CONTACT */
//point-of-contact-identity

$('#consumer1-identity').hide();
$('#addcon-phone-number').hide();
$('#addcon-email-helper').hide();
$('#poc-email-helper').hide();
$('#poc-phone-number').hide();
// $('#poc-disclosure').hide();



  $('#ans-poc-other-who').slideUp();
    $('#point-of-contact-identity').on('change', function(){
    var poctype = $(this).val();
    $('#ans-poc-other-who').slideDown();
    $('#ans-poc-other-who-spacer').slideUp();

/*    alert(poctype); */

      // Change out label for additional info field based on the user's selection for "Relationship to consumer"
      $( '#ans-poc-other-who' ).show();

      switch (poctype) {

        case 'family-member':
          $('#cr-poc-other-who-label').text('Type of family member');
          break;

        case 'friend':
          $('#cr-poc-other-who-label').text('Type of friend');
          $( '#ans-poc-other-who' ).hide();
          break;

        case 'attorney':
          $('#cr-poc-other-who-label').text('Law firm or practice');
          break;

        case 'gov-employee':
          $('#cr-poc-other-who-label').text('Agency or organization');
          break;

        case 'advocate':
          $('#cr-poc-other-who-label').text('Organization name');
          break;

        case 'housing-counselor':
          $('#cr-poc-other-who-label').text('Organization name');
          break;

        case 'other':
          $('#cr-poc-other-who-label').text('Type of relationship');
          break;

        default:
          $('#cr-poc-other-who-label').text('Organization name');
      }
    } );

    $('#cr-add-consumer-full').change(function(){
        if($('#cr-add-consumer-full').is(':checked')){
        $('#addcon-optional-status').text('');
    $('#addcon-email-helper').slideDown();
        $('#addcon-phone-number').slideDown();
        $('.additional-consumer-email').removeClass('cr-question-last');
        }else{
        $('#addcon-optional-status').text('(Optional)');
    $('#addcon-email-helper').slideUp();
        $('#addcon-phone-number').slideUp();
        $('.additional-consumer-email').addClass('cr-question-last');
        }
    });

    $('#cr-add-poc-full').change(function(){
        if($('#cr-add-poc-full').is(':checked')){
        $('#poc-phone-number').slideDown(400);
    $('#poc-email-helper').slideDown();
    //$('#poc-disclosure').slideDown();
    $('.poc-email-address').removeClass('cr-question-last');

        }else{
        $('#poc-phone-number').slideUp(400);
        // $('#poc-disclosure').slideUp();
    $('#poc-email-helper').hide();
        $('.poc-email-address').addClass('cr-question-last');

        }
    });

  $('.DAMN').on('click', function(){
      alert('clicked!');
      $('#annotations-list').slideUp();
      $('#annotations-toggle a').text('Open annotations');
      $('#annotations-toggle').removeClass('opened');
      $('#annotations-toggle').addClass('closed');
      $('.wrapper-container').removeClass('annoslide');
  });

  $('#annotations-toggle.closed').on('click', function(){
      $('#annotations-list').slideDown();
      $('#annotations-toggle a').text('Close annotations');
      $('#annotations-toggle').removeClass('closed');
      $('#annotations-toggle').addClass('opened');
      $('.wrapper-container').addClass('annoslide');
  });

$('.cr-military-status').slideUp();
    // error handling without adding a #error-elm
    $('.error-panel a').click(function(){
      $($(this).attr('href')).focus();
      return false;
    });

    if($('h1').width() > 500)
      $('h1').css('font-size', '1.5em');
});

  /**
   * modal functions
   */
  $('#privacy').on('click', function(){
    $('<div class="cr-modal"><div class="cr-modal-bg">&nbsp;</div><div class="cr-modal-offset"><div class="cr-modal-content"><div class="cr-modal-inner"><h2>Privacy act statement</h2><p>The information you provide will permit the Consumer Financial Protection Bureau to respond to your complaint or inquiry about companies and services we supervise. Information about your complaint or inquiry (including your personally identifiable information) may be shared:</p><p>• with the entity that is the subject of your complaint;</p><p>• with third parties as necessary to get information relevant to resolving a complaint;</p><p>• with a court, a party in litigation, a magistrate, an adjudicative body or administrative tribunal in the course of a proceeding, or the Department of Justice;</p><p>• with other federal or state agencies or regulatory authorities for enforcement and statutory purposes; and</p><p>• with contractors, agents, and others authorized by the CFPB to receive this information.</p><p>We may also share your complaint or inquiry (but not your personally identifiable information) with the public through a public complaint database.</p><p>This collection of information is authorized by 12 U.S.C. § 5493.</p><p>You are not required to file a complaint or share any identifying information, including your Social Security number, and you may withdraw your complaint at any time. However, if you do not include the requested information, the CFPB may not be able to act on your complaint.</p><a href="#" class="cr-modal-close">Close</a></div></div></div></div>').appendTo('body');
    $(".cr-modal").animate({
      opacity: 1
    }, 600 );
  });

  $('#omb').on('click', function(){
/*     e.preventDefault(); */
    $('<div class="cr-modal"><div class="cr-modal-bg">&nbsp;</div><div class="cr-modal-offset"><div class="cr-modal-content"><div class="cr-modal-inner"><h2>OMB #3170-0011</h2><p>An agency may not conduct or sponsor, and a person is not required to respond to, a collection of information unless the collection of information displays a valid control number assigned by the Office of Management and Budget (OMB). The OMB control number for this collection is 3170-0011, expires 11/30/2014.</p><a href="#" class="cr-modal-close">Close</a></div></div></div></div>').appendTo('body');
    $(".cr-modal").animate({
      opacity: 1
    }, 600 );
  });


  $('#narrative-consent-modal').on('click', function(){
    $('<div class="cr-modal"> <div class="cr-modal-bg">&nbsp;</div> <div class="cr-modal-offset"> <div class="cr-modal-content"> <div class="cr-modal-inner"> <h2>Include your description of what happened on consumerfinance.gov</h2> <p>When you submit a complaint through the CFPB, you can choose to publish your description of what happened in the Consumer Complaint Database on our website, consumerfinance.gov. This will help researchers, journalists, and other consumers understand the financial marketplace though reading your first-hand account.</p> <p>You should avoid including personal information, such as names, addresses, and account numbers in the content of your description, but we will also conduct a series of automated and manual reviews to remove remaining personal information before publishing. The following example highlights information that would be removed:</p> <p id="scrubbed-narrative">We took out a private education loan for our daughter <span class="redacted-text">XXXXXX</span> while she was attending the <span class="redacted-text">XXXXXX</span> University in <span class="redacted-text">XXXXXX</span>, MA. This loan went into default after she transferred to a community college in <span class="redacted-text">XXXXXX</span>, MA. Our lender received notice that she was no longer a full-time student in <span class="redacted-text">XX</span>/<span class="redacted-text">XX</span>/2011. Then our younger son <span class="redacted-text">XXXXXXX</span> became very sick and we could no longer make the monthly payments on our daughter’s loan. We tried to set up a new payment plan to get us back on track, but the servicer won’t negotiate. We\'ve been paying what we can but we still haven\'t reduced any of the principal on the loan. </p>  <p>We monitor this process to ensure that all personal information is removed, but a small risk remains that something will be missed. We won’t publish your description until we have finished the process of removing personal information, so your description won’t appear in the database right away.</p> <p>Publishing your description on consumerfinance.gov is completely optional. If you authorize publication but change your mind, you can withdraw your authorization at any time by calling the CFPB help line at (855) 411-2372. Your description will then be removed the next time the database is updated.</p><p>Whether you choose to provide or withdraw your authorization will not affect how your complaint is handled.</p> <a href="#" class="cr-modal-close">Close</a></div></div></div></div>').appendTo('body');
    $(".cr-modal").animate({
      opacity: 1
    }, 600 );
  });


  $('#save-and-continue-later-link').on('click', function(){
    $('<div class="cr-modal"> <div class="cr-modal-bg">&nbsp;</div> <div class="cr-modal-offset"> <div class="cr-modal-content"> <div class="cr-modal-inner"> <h2>Create an account so you can continue later</h2> <p>Log in or create an account and we will send you a link and a complaint ID number that you can use to finish submitting this complaint.</p> <div id="save-options" class="select-product-or-issue select-save-method">                          <label class="radio block save-options-label">                 <input name="radio_" type="radio" class="radio_input product save-options-radio save-with-email selected" value="save-with-email" />                  Create an account                 <br /><small></small>             </label>                                                                            <label class="radio block save-options-label">                 <input name="radio_" type="radio" class="radio_input save-options-radio product save-with-login" value="save-with-login" />                  Log in                 <br /><small></small>             </label> </div> <hr class="save-method-hr" /> <fieldset id="save-with-email" class="save-method">     <div class="span3 cr-label cr-save-option email">       <label for="con1-email">      Email address or Phone number       <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-email2" id="cr-email2_2356852120719850" placeholder="" class="input-large left">       <p>We will send a link to this email address to continue this complaint</p>     </div>    <div class="span3 cr-label cr-save-option">       <label for="con1-email">      Create a password       <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-password" id="cr-email2_2356852120719850" placeholder="" class="input-large left">       <p>Include letters and numbers, at least 8 characters</p>     </div>     </fieldset> <fieldset id="save-with-phone" class="save-method">        <div class="span3 cr-label cr-save-option">       <label for="con1-email">      Phone number        <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-email2" id="cr-email2_2356852120719850" placeholder="" class="input-large left">     <p>We will send a text message to this phone number. Standard messaging rates may apply.</p>    </div>    <div class="span3 cr-label cr-save-option">       <label for="con1-email">      Create a password       <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-password" id="cr-email2_2356852120719850" placeholder="" class="input-large left">       <p>Include letters and numbers, at least 8 characters</p>     </div>     </fieldset> <fieldset id="save-with-login" class="save-method">    <p>If you have submitted a complaint to the CFPB in the past, log in to save this complaint to your account. </p>         <div class="span3 cr-label cr-save-option email">       <label for="con1-email">      Email address or phone number       <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-email2" id="cr-email2_2356852120719850" placeholder="" class="input-large left">     </div>    <div class="span3 cr-label cr-save-option">       <label for="con1-email">      Password      <div class="is-required">Answer Required</div>      </label>      <input type="email" name="cr-password" id="cr-email2_2356852120719850" placeholder="" class="input-large left">           </div>             </fieldset> <a id="save-and-continue-with-email" class="save-with-email save-type" href="#"><button class="btn" type="button">Create an account and save progress</button></a> <a id="save-and-continue-with-phone" class="save-with-phone save-type" href="#"><button class="btn" type="button">Save progress</button></a> <a id="save-and-continue-with-login" class="save-with-login save-type" href="#"><button class="btn" type="button">Log in and save progress</button></a><p>&nbsp;</p> <a href="#" class="cr-modal-close">Close</a></div></div></div></div>').appendTo('body');
    $(".cr-modal").animate({
      opacity: 1
    }, 600 );
/*     $('input.save-with-email').value(':checked'); */
    $('input.save-with-email').parent().addClass('active');
    $('input.save-with-email').prop("checked", true);
  $('fieldset#save-with-phone').hide();
  $('fieldset#save-with-login').hide();
    $('a.save-with-phone').hide();
  $('a.save-with-login').hide();

      $('.save-options-radio').on('change', function(){

        if ( $('.save-options-radio').is(':checked') ) {
      var savetype = $(this).attr('value');
      $('fieldset.save-method').hide();
      $('a.save-type').hide();
      $('.save-options-label').removeClass('active');
      $(this).parent().addClass('active');
          $('#' + savetype).fadeIn();
          $('a.' + savetype).fadeIn();

      }
    });
  $('#save-and-continue-with-email').on('click', function(){
      $('.cr-modal-inner').children().hide();
      $('<h2>Complaint saved!</h2> <p class="your-id-number">Your complaint draft ID number is <strong>141030-43002</strong></p> <p>We have sent an email to yourname@email.com that includes this draft ID and a link to log in to your account and finish submitting this complaint.</p> <p>You can also complete this complaint over the phone by calling us at (855) 411-2372 and providing the draft ID number along with your email address and password.</p> <p>Make sure to come back soon! Your link will expire on November 10th, 2014. After that date, your information will be securely removed from our servers.</p> <p>&nbsp;</p> <a href="#" class="cr-modal-close">Close</a>').appendTo('.cr-modal-inner');
  });

  $('#save-and-continue-with-phone').on('click', function(){
      $('.cr-modal-inner').children().hide();
      $('<h2>Complaint saved!</h2> <p class="your-id-number">Your complaint draft ID number is <strong>141030-43002</strong></p> <p>We have sent a text message to (512) 884-7870 that includes this draft ID and a link to log in to your account and finish submitting this complaint.</p> <p>You can also complete this complaint over the phone by calling us at (855) 411-2372 and providing the draft ID number along with your phone number and password.</p> <p>Make sure to come back soon! Your link will expire on November 10th, 2014. After that date, your information will be securely removed from our servers.</p> <p>&nbsp;</p> <a href="#" class="cr-modal-close">Close</a>').appendTo('.cr-modal-inner');
  });

  $('#save-and-continue-with-login').on('click', function(){
      $('.cr-modal-inner').children().hide();
      $('<h2>Complaint saved!</h2> <p class="your-id-number">Your complaint draft ID number is <strong>141030-43002</strong></p> <p>We have sent an email to yourname@email.com that includes this draft ID and a link to log in to your account and finish submitting this complaint.</p> <p>You can also complete this complaint over the phone by calling us at (855) 411-2372 and providing the draft ID number along with your contact information.</p> <p>Make sure to come back soon! Your link will expire on November 10th, 2014. After that date, your information will be securely removed from our servers.</p> <p>&nbsp;</p> <a href="#" class="cr-modal-close">Close</a>').appendTo('.cr-modal-inner');
  });

  });

  $('#save-and-continue-review-page').on('click', function(){
    $('<div class="cr-modal"><div class="cr-modal-bg">&nbsp;</div><div class="cr-modal-offset"><div class="cr-modal-content"><div class="cr-modal-inner"><h2>Complaint saved!</h2> <p class="your-id-number">Your complaint draft ID is <strong>141030-43002</strong></p> <p>We have sent an email to <strong>p.robinson@gmail.com</strong> that includes this complaint draft ID and a link to log in to your account and finish submitting your complaint.</p> <p>You can also complete this complaint over the phone by calling us at (855) 411-2372 and providing this draft ID number along with your email address and phone number.</p> <p>Make sure to come back soon! Your link will expire on November 10th, 2014. After that date, your information will be securely removed from our servers.</p> <a href="#" class="cr-modal-close">Close</a></div></div></div></div>').appendTo('body');
    $(".cr-modal").animate({
      opacity: 1
    }, 600 );
  });

  $('body').on('click', '.cr-modal-close', function(){
    $(".cr-modal").animate({
      opacity: 0
    }, 600, function() {
      $('.cr-modal').remove();
    });
  });
  $('body').on('click', '.cr-modal-bg', function(){
    $(".cr-modal").animate({
      opacity: 0
    }, 600, function() {
      $('.cr-modal').remove();
    });
  });

  // show/hide save options
