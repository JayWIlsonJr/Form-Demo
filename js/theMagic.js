$(document).ready(function() {

  var current_fs, next_fs, previous_fs;
  var left, opacity, scale;
  var animating;

  $('.next').click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parents('fieldset');
    next_fs = $(this).parents('fieldset').next();
    

    $('.progress-bar li').eq($('fieldset').index(next_fs)).addClass('active');
    
    next_fs.show();

    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        scale = 1 - (1 - now) * 0.2;
        left = (now * 50) + "%";
        opacity = 1 - now;
        current_fs.css({'transform': 'scale('+scale+')'});
        next_fs.css({'left': left, 'opacity': opacity});
      },
      duration: 800, 
      complete: function() {
        current_fs.hide();
        animating = false;
      }, 

      easing: 'easeInOutBack'
      
    });
  });


  $('.previous').click(function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parents('fieldset');
    previous_fs = $(this).parents('fieldset').prev();
    

    $('.progress-bar li').eq($('fieldset').index(current_fs)).removeClass('active');
    
    previous_fs.show();

    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        scale = 0.8 + (1 - now) * 0.2;
        left = ((1 - now) * 50) + "%";
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
      },
      duration: 800, 
      complete: function() {
        current_fs.hide();
        animating = false;
      }, 
      
      easing: 'easeInOutBack'
      
    });
  });



  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    
    swal({   
      title: "Success!",   
      text: "Thanks, we'll be in contact with you!",   
      type: "success",   
      confirmButtonText: "OK", 
      timer: "4000" 
    });

    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize()
    });

  });


});