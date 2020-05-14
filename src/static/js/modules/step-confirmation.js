'use strict';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


function init() {
  $('.form button').click( function() {
      var phoneInput = document.getElementById('phone');
      var phoneOutput = document.getElementById('text-message-phone');
      phoneOutput.innerHTML = phoneInput.value;
      var optedIn = document.getElementById('text-opt-in').checked;
      if ( !optedIn ) {
          var optedInMessage = document.getElementById('opted-in-message');
          optedInMessage.style.display = "none";
      }

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