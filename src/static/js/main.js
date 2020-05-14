'use strict';
var globalModals = require( './modules/global-modals' );
var stepWelcome = require( './modules/step-welcome' );
var stepSelectProduct = require( './modules/step-select-product' );
var stepSelectIssue = require( './modules/step-select-issue' );
var stepWhatHappened = require( './modules/step-what-happened' );
var stepCompanyInformation = require( './modules/step-company-information' );
var stepYourInformation = require( './modules/step-your-information' );
var stepReviewAndSubmit = require( './modules/step-review-and-submit' );
var stepConfirmation = require( './modules/step-confirmation' );



// Determine what step the script is on.
var path = window.location.pathname.split( '/' );
path = path[path.length-1].toLowerCase();
switch ( path ) {
  case 'welcome.html':
    stepWelcome.init();
    break;
  case 'select-product.html':
    //stepSelectProduct.init();
    break;
  case 'select-issue.html':
    //stepSelectIssue.init();
    break;
  case 'what-happened.html':
    //stepWhatHappened.init();
    break;
  case 'company-information.html':
    //stepCompanyInformation.init();
    break;
  case 'your-information.html':
    //stepYourInformation.init();
    break;
  case 'review-and-submit.html':
    //stepReviewAndSubmit.init();
    break;
  case 'confirmation.html':
    stepConfirmation.init();
    break;

}

// Run global scripts
globalModals.init();


function loadSvg(selector, url) {
  var target = document.querySelector(selector);
  if ( target ) {
    // If SVG is supported
    if (typeof SVGRect != "undefined") {
      // Request the SVG file
      var ajax = new XMLHttpRequest();
      ajax.open("GET", url + ".svg", true);
      ajax.send();

      // Append the SVG to the target
      ajax.onload = function(e) {
        target.innerHTML = ajax.responseText;
      }
    } else {
      // Fallback to png
      target.innerHTML = "<img src='" + url + ".png' />";
    }
  }
}

loadSvg('.clipboard', 'static/img/Clipboard');

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];



function formatDate( date, format ) {
  format = format || 'num';
  var year = date.getFullYear();
  var day = date.getDate();
  if ( format == 'num' ) {
    var month = date.getMonth() + 1;
    return month + '/' + day + '/' + year;
  } else if ( format == 'text' ) {
    var month = monthNames[date.getMonth()];
    return month + ' ' + day + ', ' + year;
  }
}

function getDateRange( now, start, end ) {
  var start_date = addDays(now, start);
  var end_date = addDays(now, end);

  var start_year = start_date.getFullYear();
  var end_year = end_date.getFullYear();
  var start_day = start_date.getDate();
  var end_day = end_date.getDate();
  var start_month = monthNames[start_date.getMonth()];
  var end_month = monthNames[end_date.getMonth()];

  if ( start_year == end_year ) {
      if ( start_month == end_month ) {
        return start_month + ' ' + start_day + '-' + end_day + ', ' + end_year
      } else {
        return start_month + ' ' + start_day + '-' + end_month + ' ' + end_day + ', ' + end_year
      }
  } else {
    return start_month + ' ' + start_day + ', ' + start_year + '-' + end_month + ' ' + end_day + ', ' + end_year
  }

}


var dates = $('[data-date]');
if (dates) {
  var now = new Date();
  dates.each(function (i, date) {
    var num = $(date).data('date');
    var future_date = addDays(now, num);
    $(date).text(formatDate(future_date, $(date).data('format')));
  });
}

var date_ranges = $('[data-range]');
if (date_ranges) {
  var now = new Date();
  date_ranges.each(function (i, date) {
    var start = $(date).data('start');
    var end = $(date).data('end');
    console.log(start)
    var range_text = getDateRange( now, start, end );
    $(date).text(range_text);
  });
}
