$(document).ready(function(){

  $('#calendar').fullCalendar({

     googleCalendarApiKey: 'AIzaSyDfXGKfDOOkUPi4A6Kkp_blfRHYUNw3nts',
     // would be nice to figure out how to use variable names for colors here, but for now hex codes will do
     eventSources:[
     {
         googleCalendarId: 'en.usa#holiday@group.v.calendar.google.com',
         className: 'holiday',
         color: '#666'
     },{
         googleCalendarId: 'g7cfpme5n3h77psrsk4vqtbj4k@group.calendar.google.com',
         className: 'event-cx',
         color: '#C7561E'
     },{
         googleCalendarId: '3vi9ehsvibkfb1m31o0mqjbgec@group.calendar.google.com',
         className: 'event-other',
         color: '#CF9911'
     },{
         googleCalendarId: 'sio3juast9s4segv90hnf5om6g@group.calendar.google.com',
         className: 'event-road',
         color: '#AD2D2D'
     }, {
         googleCalendarId: '9uug907sfhgcrcjg220qlod3dg@group.calendar.google.com',
         className: 'event-track',
         color: '#536CA6;'
     }, {
         googleCalendarId: 'ovnk6hqp5kq9bh02pub51uhu0c@group.calendar.google.com',
         className: 'event-dh',
         color: '#9643A5'
     }, {
         googleCalendarId: 'nm65gk954gu676ujcbqf3hshe8@group.calendar.google.com',
         className: 'event-enduro',
         color: '#A7B828'
     }, {
         googleCalendarId: 'naf2khsbbn3artfoekqldbtfpg@group.calendar.google.com',
         className: 'event-xco',
         color: '#3C995B'
     }

   ],


  eventClick: function(event) {

    $("#myModalLabel").html(event.title);

    // reset modal and remove data from last time
    $("#eventDesc").html('');
    $("#eventDateTime").html('');
    $("#eventLoc").html('');
      // Resets so that last data does not display in modal


    $("#eventDateTime").html(event.start.format("dddd, MMMM Do YYYY"));
    $("#eventDesc").html(event.description);
    $("#eventLoc").html(event.location);

    $("#myModal").modal("show");
    // open modal window

    return false; // do not open event url
  }

});

// EVentually this should get DRYed out
// Need to toggle button display to signify calendar display status

  $('#btn-road').click(function(){
    $('.event-road').toggle();
  });
  $('#btn-xco').click(function(){
    $('.event-xco').toggle();
  });
  $('#btn-cx').click(function(){
    $('.event-cx').toggle();
  });
  $('#btn-other').click(function(){
    $('.event-other').toggle();
  });
  $('#btn-track').click(function(){
    $('.event-track').toggle();
  });
  $('#btn-dh').click(function(){
    $('.event-dh').toggle();
  });
  $('#btn-enduro').click(function(){
    $('.event-enduro').toggle();
  });
  $('#btn-hol').click(function(){
    $('.holiday').toggle();
  });

});
