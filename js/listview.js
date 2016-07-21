/*
http://stackoverflow.com/questions/28061622/how-to-implement-agenda-list-view-in-fullcalendar-2-2-6
http://www.paulthedutchman.nl/portfolio/?mi=113

 */


fcViews.agendaList = agendaListView;

defaults.buttonText.agendaList='agenda';

defaults.titleFormat.agendaList='W';

defaults.agendaDisType   = true;

function agendaListView(element, calendar) {
    var t = this;

    t.render = render;

    ListView.call(t, element, calendar );
    var opt = t.opt;

    var formatDate = calendar.formatDate;


function render(date, delta) {
   if (delta) {
        addDays(date, delta * 7);
    }
    var start = addDays(cloneDate(date), -((date.getDay() - opt('firstDay') + 7) % 7));
//  var start = addDays(cloneDate(date), 1);
    var end = addDays(cloneDate(start), 7);
    var visStart = cloneDate(start);
    var visEnd = cloneDate(end);
    var weekends = opt('weekends');
    if (!weekends) {
        skipWeekend(visStart);
        skipWeekend(visEnd, -1, true);
    }
    t.title = formatDates(
        visStart,
        addDays(cloneDate(visEnd), -1),
        opt('titleFormat')
    );
    t.start = start;
    t.end = end;
    t.visStart = visStart;
    t.visEnd = visEnd;
    //renderAgendaList(false);
}
}

function ListView(element, calendar) {
    var t = this;


    // exports
    //t.renderAgendaList = renderAgendaList;
    t.setHeight = setHeight;
    t.setWidth = setWidth;
    t.renderEvents = renderEvents;
    t.clearEvents = clearEvents;

    t.cellIsAllDay = function () {
        return true
    };

    t.getColWidth = function () {
        return colWidth
    };
    t.getDaySegmentContainer = function () {
        return daySegmentContainer
    };


    // imports
    View.call(t, element, calendar, 'agendaList' );
    OverlayManager.call(t);
    SelectionManager.call(t);

    var opt = t.opt;
    var trigger = t.trigger;

    var formatDate = calendar.formatDate;

    // locals
    var updateEvents = t.calendar.updateEvents;
    var body;

    var viewWidth;
    var viewHeight;
    var colWidth;

    var firstDay;

    var eventElementHandlers = t.eventElementHandlers;

    // We are switching to List display, hence no need of this function anymore
    // But if you would prefer the consistency, we can swicth and have table based listview
    /*
    function renderAgendaList() {
        if (!body) {
            buildTable();
        } else {
            clearEvents();
        }
    }*/


    function buildTable() {
        body = false;
    }


    function setHeight(height) {
    viewHeight = height;
    var bodyHeight = viewHeight;
    }

    function setWidth(width) {
        viewWidth = width;
    }

    var reportEventClear = t.reportEventClear;
    var getDaySegmentContainer = t.getDaySegmentContainer;


    /*Date.prototype.addDays = function( days ) {
        this.setDate(this.getDate() + days );
        return this;
    }*/

    function renderEvents(events, modifiedEventId) {
       //Duplicate the list of events to be used during the display
        //For repeating and multi-days events, we wanna make sure we add those days each event happens
        //for example event that start from 1st to 4th, we will add on our list displayeventlist 1,2,3 and 4th this event
        // We could have used other methods like scanning the dates and checking each event, but this seem to be more efficient

        var displayeventlist = [];
        var tstart, tend;
        var j = 0;
        for(i in events) {
            displayeventlist[j] = Object.create(events[i]);
            tstart = cloneDate(events[i].start,true);
            tend   = cloneDate(events[i].end,true);
          // console.log(" Event start date "+ displayeventlist[i].start +" end date "+ displayeventlist[i].end+" "+ displayeventlist[i].title);
            while( (tend - tstart) > 0 ) {
                j = j + 1;
                displayeventlist[j] = Object.create(events[i]);
                tstart = addDays(tstart, 1);
                displayeventlist[j].start = cloneDate(tstart);
            }
            j = j + 1;
        }

     // sort our display list, makes easier to display
        displayeventlist.sort(function(a,b) {
                       var  dateA = new Date(a.start);
                       var dateB = new Date(b.start);
                       return dateA-dateB;
                       });

        //Start displaying our sorted list
        var html    = $("<ul class='fc-agendaList'></ul>");
        var mm, dd, tt, dt, lurl, ltitle, em;
        var temp, i = 0;
        var vm = formatDate(t.visStart, 'W');

        for (i in displayeventlist) {
            //console.log(" Event start date "+ displayeventlist[i].start +" end date "+ displayeventlist[i].end+" "+ displayeventlist[i].title);
            z = i;
            em = formatDate(displayeventlist[i].start, 'W');
            // retrieve only current view week events
            if ( em == vm ) {
                dd      = formatDate(displayeventlist[i].start, 'dddd');
                lday    = formatDate(displayeventlist[i].start, 'd MMMM yyyy');
                ltitle  = displayeventlist[i].title;
                allDay  = displayeventlist[i].allDay;
                st      = formatDate(displayeventlist[i].start, 'H:mm');
                et      = formatDate(displayeventlist[i].end, 'H:mm');
                lurl    = displayeventlist[i].url;
                classes = displayeventlist[i].className;
                ldesc   = displayeventlist[i].location;

                if (lday != temp) { //on change de jour
                    $("<li class='fc-agendaList-dayHeader ui-widget-header'>" +
                        "<span class='fc-agendaList-day'>"+dd+"</span>" +
                        "<span class='fc-agendaList-date'>"+lday+"</span>" +
                    "</li>").appendTo(html);
                    temp = lday;
                }
                if (allDay) {
                    eventdisplay = $("<li class='fc-agendaList-item fc-today fc-thu'>"+
                                        "<"+ (lurl ? "a href='"+ lurl +"'" : "div") + " class='fc-agendaList-event fc-eventlist "+classes+"'>"+
                                        "<div class='fc-event-time'>"+
                                            "<span class='fc-event-all-day'></span>"+
                                        "</div>"+
                                        "<div class='fc-agendaList-eventDetails'>"+
                                          "<div class='fc-eventlist-title'>"+ltitle+"</div>"+
                                          (opt('showLocation') ? "<div class='fc-eventlist-desc'>"+ldesc+"</div>" : "")+
                                        "</div>"+
                                      "</" + (lurl ? "a" : "div") + ">"+
                                    "</li>").appendTo(html);
                } else {
                    eventdisplay = $("<li class='fc-agendaList-item fc-today fc-thu'>"+
                                    "<"+ (lurl ? "a href='"+ lurl +"'" : "div") + " class='fc-agendaList-event fc-eventlist "+classes+"'>"+
                                        "<div class='fc-event-time'>"+
                                            "<span class='fc-event-start-time'>"+st+(et ? " - "+et : "")+"</span> "+

                                        "</div>"+
                                        "<div class='fc-agendaList-eventDetails'>"+
                                          "<div class='fc-eventlist-title'>"+ltitle+"</div>"+
                                          (opt('showLocation') ? "<div class='fc-eventlist-desc'>"+ldesc+"</div>" : "")+
                                        "</div>"+
                                      "</" + (lurl ? "a" : "div") + ">"+
                                    "</li>").appendTo(html);

                }
                eventElementHandlers(displayeventlist[i], eventdisplay);
            }
        }
        $(element).html(html);
        trigger('eventAfterAllRender');
    }


    function clearEvents() {
        //implement this in case we wanna do list based display
    }
}
;;
