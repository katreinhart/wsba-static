$.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
  //
  // var date = new Date();
  // var d = date.getDate();
  // var m = date.getMonth();
  // var y = date.getFullYear();

  // API KEY: AIzaSyC-QKi9HTtEN8RwouBUA69nBnkeOqQAAHQ

  $(document).ready(function(){
    $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyC-QKi9HTtEN8RwouBUA69nBnkeOqQAAHQ',
      events: [{
          title: 'Womens Road Race Clinic',
          start: '2016-02-20',
          class: 'road-event'
      },{
          title: 'Sequim #1',
          start: '2016-03-12',
          class: 'road-event'
      },{
          title: 'Icebreaker TT',
          start: '2016-03-05',
          class: 'road-event'
      },{
          title: 'Mason Lake #1',
          start: '2016-03-06',
          class: 'road-event'
      },{
          title: 'Dash Point',
          start: '2016-02-21',
          class: 'mtb-event'
      },{
          googleCalendarId: '2fh1nujh8k4b49m0j2mc85lbog@group.calendar.google.com'
      }]
    });
  });
});
