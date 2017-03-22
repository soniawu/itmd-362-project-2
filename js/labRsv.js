$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
(function($) {
  $(document).ready(
    function() {
      // Not utilizing nojs/hasjs classes this time. 
      // Leave them here as a pattern for future reference.
      $('html').removeClass('nojs');
      $('html').addClass('hasjs');
      
      var dates = [];
      var daysAllowed = 30;
      var curTime = new Date();
      
      // Listen to the form submit.
      $('#select-lab').on('change', function(e) {
        var selLab = $('#select-lab').val();
        
        if (selLab !== 'noLab') {
          $('#date-grp').removeClass('hide');
          // show the lab available 
          genLabDates();
          fillDateOpt();
          $('#select-date').on('change', function(e) {
            var selDate = $('#select-date').val();
            if (selDate !== 'noDate') {
              $('#time-grp').removeClass('hide');
              
              fillTimeOpt();
              
              $('#select-time').on('change', function() {
                var selTime = $('#select-time').val();
                if (selTime !== 'noTime') {
                  $('#reserve-btn').removeClass('hide');
                  $('#reserve-btn').on('click', function() {
                    // add handle submit button here
                  });
                } else {
                  $('#reserve-btn').addClass('hide');
                }
              });
            } else {
              $('#time-grp').addClass('hide');
              $('#reserve-btn').addClass('hide');
            }
            //e.preventDefault();
          });
        } else {
          $('#date-grp').addClass('hide');
          $('#time-grp').addClass('hide');
          $('#reserve-btn').addClass('hide');          
        }
        e.preventDefault();
      });
      
      function fillTimeOpt() {
        var idx = $('#select-date').val().substring(4);
        var day = dates[Number(idx)].substring(0,3);
        var theDate = new Date();
        var startTime, endTime;
        var numSlots;
        //var anHour = 3600000;
        
       
        $('#select-time').append('<option value="noTime" selected>Select a time slot</option>');
        if (Number(idx)===0){
          startTime = curTime.getHours() + 1;
          var endTime;
          if ((day==='Mon')||(day==='Tue')||(day==='Thu')||(day==='Fri')) {
            endTime = 20;
          } else if (day==='Wed') {
            endTime = 11;
          } else if (day==='Sat') {
            endTime = 12;
          }
          console.log('It is today' , startTime, endTime);
          numSlots = endTime - startTime;
        } else if ((day==='Mon')||(day==='Tue')||(day==='Thu')||(day==='Fri')) { 
          startTime = 8;
          numSlots = 13;
          //console.log(theDate.getHours(),theDate.getUTCHours());
        } else if ((day==='Wed')) {
          startTime = 12;
          numSlots = 12;
        } else if (day==='Sat') {
          startTime = 9;
          numSlots = 3;
        }
        
        theDate.setHours(startTime);
        theDate.setMinutes(0);
        theDate.setSeconds(0);
        for ( var i=0; i<(numSlots); i++) {
          var slot = theDate.toLocaleTimeString();
          theDate.setHours(++startTime);
          slot += ' - ';
          slot += theDate.toLocaleTimeString();
          $('#select-time').append('<option value="idx-'+i+'">'+slot+'</option>');
          //console.log(slot);
        }
      }
      function fillDateOpt() {
        $('#select-date').append('<option value="noDate" selected>Select a date</option>');
        for (var i=0; i<dates.length; i++){
          $('#select-date').append('<option value="idx-'+i+'">'+dates[i]+'</option>');
        }
      }
      
      function genLabDates() {        
        var utcTime = curTime.getTime();
        var aDay = 86400000;
        var i = 0;
        while ( i<daysAllowed ) {
          var newDate = curTime;
          var day;
          var dateStr;
          //console.log(newDate.toDateString(),newDate.getDay());
          
          day = newDate.getDay();
          if (day) {
            dates[i] = newDate.toDateString();
            i++;
          }
          utcTime += aDay;
          newDate.setTime(utcTime);
        }
        
      } // end if function generateLabScheule()
    })
})(jQuery);
