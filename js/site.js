$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
(function($) {
  $(document).ready(
    function() {
      var classList = 
        [{classCode:"ITMD-361",
          className:"Fundamentals of Web Development", 
          level:"CE",grade:"A",startDate:"",endDate:"",credit:3},
         {classCode:"ITMD-411",
          className:"Inermediate Software Development", 
          level:"CE",grade:"A",startDate:"",endDate:"",credit:3},
         {classCode:"ITMD-421",
          className:"Data Modeling and Appication", 
          level:"CE",grade:"B",startDate:"",endDate:"",credit:3},
         {classCode:"ITMD-460",
          className:"Fundamentals of Multimedia", 
          level:"CE",grade:"A",startDate:"",endDate:"",credit:3},
         {classCode:"ITMD-462",
          className:"Web Site Application Development", 
          level:"CE",grade:"A",startDate:"",endDate:"",credit:3}];
      var term = "noTerm";
      
      if ($('#select-term').children().length <= 0) {
        fillTermOpt();
      }
  
      $('#select-term').on('change',function() {
        term = $('#select-term').val();
        if (term != "noTerm") {
          $('#slct-term').addClass('hide');
          $('#std-info-head').addClass('trans-info-head');
          $('#cur-info-head').addClass('trans-info-head');
          $('#cls-info-head').addClass('trans-info-head');
          displayTranscript();
        }
      });
      
      $('#home-btn').on('click', function() {
        document.location.href = '../main/index.html';
      });
      
      $('#new-term-btn').on('click', function() {
        location.reload();
      });
      function displayTranscript() {
        // This block of data should be obtained from database
        var txt = "";
        var name = "Kevin ";  // use the user name when known
        var dob = "May 20, 1998";
        var type = "undergraduate";
        var program = "Bachelor Degree";
        var college = "School of Applied Technology";
        var major = "Applied Technology";
        
        
        txt = term + ' Transcript';
        $('#transcript-title').html(txt);
        
        txt = "STUDENT INFORMATION";
        $('#std-info-head').html(txt);
        
        txt = '<p>Name : '  + name + '</p>' ;
        $('#student-info').append(txt);
        
        txt = '<p>Date of birth : '  + dob + '</p>';
        $('#student-info').append(txt);
        
        txt = '<p>Student type : '  + type + '</p>';
        $('#student-info').append(txt);
        
        txt = "CURRICULUM INFORMATION";
        $('#cur-info-head').html(txt);
 
        txt = '<p>Program : '  + program + '</p>';
        $('#curr-info').append(txt); 
        
        txt = '<p>College : '  + college + '</p>';
        $('#curr-info').append(txt);    
        
        txt = '<p>Major : '  + major + '</p>';
        $('#curr-info').append(txt); 
         
        txt = "COURSES";
        $('#cls-info-head').html(txt); 
        
        // build table header
        txt = '<table id="cls-tbl" border="1" align="center"><tr><th>Class Code</th><th>Class Name</th><th>Start Date </th><th>End Date</th><th>Credit</th><th>Grade</th></tr></table>';
        $('#class-list').append(txt);
        for (var i=0; i<classList.length; i++) {
          var cd = classList[i].classCode;
          var cn = classList[i].className;
          var sd = classList[i].startDate;
          var ed = classList[i].endDate;
          var crd = classList[i].credit;
          var grd = classList[i].grade;
          txt = '<tr><td>'+cd+'</td><td>'+cn+'</td><td>'+sd+'</td><td>'+ed+'</td><td>'+crd+'</td><td>'+grd+'</td></tr>';
          $('#cls-tbl').append(txt);
        }
      }  // displayTranscript()
      
      function fillTermOpt() {
        var numOfYears = 10;
        var currYear = (new Date()).getFullYear();
        
        $('#select-term').append('<option value="noTerm" selected>Select a term</option>');
        
        for (var i=0; i<numOfYears; i++) {
          var termText = 'Spring ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = 'Summer ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = 'Fall ' + currYear;
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          termText = currYear + ' Professional Learning';
          $('#select-term').append('<option value="'+termText+'">'+termText+'</option>');
          currYear--;
        }
      }
    })
})(jQuery);
