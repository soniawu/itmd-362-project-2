$.noConflict();

// jQuery 3.x-style ready event and locally scoped $
(function($) {
  $(document).ready(
    function() {
      var userName = "David Wong";
      // This is a hard coded list of classes for the transcript.
      var classList = 
        [{classCode:"ITMD-361",
          className:"Fundamentals of Web Development", 
          level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-411",
            className:"Inermediate Software Development", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-421",
            className:"Data Modeling and Appication", 
            level:"CE", grade:"B", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-460",
            className:"Fundamentals of Multimedia", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3},
          {classCode:"ITMD-462",
            className:"Web Site Application Development", 
            level:"CE", grade:"A", startDate:"", endDate:"", credit:3}];
      var term = "noTerm";

      $('.user-name').html('login as '+userName);
      
      if ($('#select-term').children().length <= 0) {
        fillTermOpt();
      }
      
      $('#select-term').on('change', function() {
        term = $('#select-term').val();
        if (term !== "noTerm") {
          fillStrEndDate();
          // Hide the term selection box and enable transcript information headings
          $('#slct-term').addClass('hide');
          $('#std-info-head,#cur-info-head,#cls-info-head').addClass('trans-info-head');
       /*   $('#cur-info-head').addClass('trans-info-head');
          $('#cls-info-head').addClass('trans-info-head'); */
          displayTranscript();
        }
      });
      
      $('#ofc-tsc-btn, .close').on('click', function() {
        $('#ofc-tsc-popup').toggle();
      });   
  
      $('#transcript-link, #home-btn, #new-term-btn').on('click', function() {
        var id = this.id;
        switch(id) {
          case 'transcript-link' :
            document.location.href = '../transcript/index.html';
          break;
          case 'home-btn' :
            document.location.href = '../main/index.html';
          break;
          case 'new-term-btn' :
            location.reload();
          break;
        };
      });
      
      $('#navAcademic').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c1');
      });
      
      $('#navFinance').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c2');
      });
      
      $('#navActivities').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c3');
      });
      
      $('#navAdvisor').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c4');
      });
      
      $('#navLinks').on('click', function(e) {
        e.preventDefault();
        $('#nav').addClass('c5');
      }); 
      
      $('.navback').on('click', function(e) {
        e.stopPropagation();
        $('#nav').removeClass('c1');
        $('#nav').removeClass('c2');
        $('#nav').removeClass('c3');
        $('#nav').removeClass('c4');
        $('#nav').removeClass('c5');
      });
      
      $('#logoutBtn').on('click', function() {
        document.location.href = '../index.html';
      });
      
      function fillStrEndDate() {
        var dateRec = {};
        var pattern = /(Spring|Summer|Fall).+(\d{4})/;
        var i = 0;
        
        matched = term.match(pattern);
        if(matched) {
          dateRec.selYear = matched[2];
          dateRec.selSemester = matched[1]; 
        } else if ((matched = term.match(/(\d{4}).+Professional Learning/))) {
          dateRec.selYear = matched[1];
          dateRec.selSemester = "PL";
        }         
          
        switch(dateRec.selSemester) {
        case "Spring" : 
          dateRec.sDate = "Feb 20, " + dateRec.selYear;
          dateRec.eDate = "May 15, " + dateRec.selYear;
          
          break;
        case "Summer" :
          dateRec.sDate = "Jun 12, " + dateRec.selYear;
          dateRec.eDate = "Aug 3, " + dateRec.selYear;                
          break;
        case "Fall" :
        case "PL" :
          dateRec.sDate = "Aug 20, " + dateRec.selYear;
          dateRec.nextYear = Number(dateRec.selYear)+1;
          dateRec.eDate = "Jan 25, " + dateRec.nextYear;
          break;    
        }
          
        for ( i=0; i<classList.length; i++) {
          classList[i].startDate = dateRec.sDate;
          classList[i].endDate = dateRec.eDate;
        }
      }  // fillStrEndDate()
        
      function displayTranscript() {
        // This block of data should be obtained from database
        var studentRec = {name:"", 
                        dob:"May 20, 1998",
                        type: "undergraduate",
                        program: "Bachelor Degree",
                        college: "School of Applied Technology",
                        major: "Applied Technology",
                        cd: "", cn: "", sd: "", ed: "", crd: "", grd: ""};
        var txt = "";
        var i = 0;
        
        studentRec.name = userName;
        $('#transcript-title').html(term + ' Transcript');
        $('#std-info-head').html("STUDENT INFORMATION");
        $('#student-info').append('<p>Name : '  + studentRec.name + '</p>');
        $('#student-info').append('<p>Date of birth : '  + studentRec.dob + '</p>');
        $('#student-info').append('<p>Student type : '  + studentRec.type + '</p>');
        $('#cur-info-head').html("CURRICULUM INFORMATION");
        $('#curr-info').append('<p>Program : '  + studentRec.program + '</p>'); 
        $('#curr-info').append('<p>College : '  + studentRec.college + '</p>');    
        $('#curr-info').append('<p>Major : '  + studentRec.major + '</p>'); 
        $('#cls-info-head').html("COURSES"); 
        
        // build table header
        txt = '<table id="cls-tbl" border="1" align="center"><tr><th>Class Code</th><th>Class Name</th><th>Start Date </th><th>End Date</th><th>Credit</th><th>Grade</th></tr></table>';
        $('#class-list').append(txt);
        for (i=0; i<classList.length; i++) {
          studentRec.cd = classList[i].classCode;
          studentRec.cn = classList[i].className;
          studentRec.sd = classList[i].startDate;
          studentRec.d = classList[i].endDate;
          studentRec.crd = classList[i].credit;
          studentRec.grd = classList[i].grade;
          txt = '<tr><td>'+studentRec.cd+'</td><td>'+studentRec.cn+'</td><td>'+studentRec.sd+'</td><td>'+studentRec.ed+'</td><td>'+studentRec.crd+'</td><td>'+studentRec.grd+'</td></tr>';
          $('#cls-tbl').append(txt);
        }
      }  // displayTranscript()
      
      /* 
        Function to fill the term selection options.
      */
      function fillTermOpt() {
        var numOfYears = 10;
        var currYear = (new Date()).getFullYear();
        var i = 0;
        var termText = "";
        
        $('#select-term').append('<option value="noTerm" selected>Select a term</option>');
        
        for (i=0; i<numOfYears; i++) {
          termText = 'Spring ' + currYear;
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

function login(form){
  if(form.username.value === "") {
    alert("Error: Username cannot be blank!");
    form.username.focus();
    return false;
  }

  if(form.pwd.value !== "") {
    if(form.pwd.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      form.pwd.focus();
      return false;
    }

  } else {
    alert("Error: Password cannot be blank!");
    form.pwd.focus();
    return false;
  }
  
  
  window.location = "main/index.html";
  return false;
}

function menu( menuform ){
  selecteditem = menuform.url.selectedIndex;
  newurl = menuform.url.options[ selecteditem ].value;
  if (newurl.length !== 0) {
    location.href = newurl;
  }
}
