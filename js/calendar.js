$.getScript('/fullcalendar.js',function(){
  //
  // var date = new Date();
  // var d = date.getDate();
  // var m = date.getMonth();
  // var y = date.getFullYear();

  // API KEY: AIzaSyC-QKi9HTtEN8RwouBUA69nBnkeOqQAAHQ

  $(document).ready(function(){
    $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyC-QKi9HTtEN8RwouBUA69nBnkeOqQAAHQ',
      events: {
          googleCalendarId: '2fh1nujh8k4b49m0j2mc85lbog@group.calendar.google.com'
      }
      
    });
  });
});
