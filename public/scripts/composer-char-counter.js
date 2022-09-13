$(document).ready(function() { /* to ensure DOM has loaded */
  $("#tweet-text").on('input', function() { 
    /* console.log(this); */
    const charNum = $(this).val().length; ////track the number of input,this ===textarea,val()method track the length.

    const counterElem = $(this).parent().children('.button-number').children('.counter');

    const trackChar = 140 - charNum;

    counterElem.text(trackChar);

    if (trackChar < 0) {
      counterElem.css('color', 'red');
    } else {
      counterElem.css('color', '#545149');
    }

  });
});


/* $('.counter')  *//* to target the counter ,use this ==text area*/

/* make counter turn red when invalid */

/* 
const textArea = Document.getElementbyId(textarea)
textArea.eventListener( 

) */


