$(document).ready(function() { /* to ensure DOM has loaded */

  $("#tweet-text").on('input', function() { 
    
    const charNum = $(this).val().length; ////track the number of input,this ===textarea,val()method track the length.

    const counterElem = $(this).parent().children('.button-number').children('.counter');

    const trackChar = 140 - charNum;

    counterElem.text(trackChar);

    if (trackChar < 0) {
      counterElem.css('color', 'red');/* make counter turn red when invalid */
    } else {
      counterElem.css('color', '#545149');
    }

  });
});



