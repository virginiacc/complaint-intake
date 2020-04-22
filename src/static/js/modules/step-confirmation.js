'use strict';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


function init() {
  console.log('hey')
  $('.form button').click( function() {
      $('.form').fadeOut(500, function () {
          $('.success-message').fadeIn();
          $([document.documentElement, document.body]).animate({
        // scrollTop: $("#success-message").offset().top
    }, 500);
      });
  } );

  var now = new Date();
  var fifteen_days = addDays(now, 15);
  console.log(fifteen_days);


}

module.exports = {
  init: init
};