let DateTime = luxon.DateTime;
const now = DateTime.now();

let events = [];

// set currentDay to the current date using Luxon
$('#currentDay').text(now.toLocaleString(DateTime.DATE_HUGE));

let auditSchedule = function() {
    // loop through all of the time blocks
    for (i = 8; i < 21; i++) {
        // get current hour and block id
        let hourNow = now.toFormat('H');
        let block = $('#block-' + i);

        if (i < hourNow) {
            block.addClass('past');
            block.removeClass('present');
            block.removeClass('future');
            block.prop('readonly', true)
        }
        else if (i == hourNow) {
            block.removeClass('past');
            block.addClass('present');
            block.removeClass('future');
            block.prop('readonly', false)
        }
        else if (i > hourNow) {
            block.removeClass('past');
            block.removeClass('present');
            block.addClass('future');
            block.prop('readonly', false)
        }
    };
};

let saveEvents = function() {
    localStorage.setItem('events', JSON.stringify(events));
};

$('.time-block').on('click', '.saveBtn', function() {
    // find the corresponding textarea
    let timeBlockEl =  $(this).closest('.time-block');
    let eventEl = timeBlockEl.find('textarea');
    
    // get event text
    let text = eventEl.val().trim();
    if (!text) {
        return false;
    }

    // get the text area id
    let eventId = eventEl.attr('id');
    
    // create event object
    let event = {
        text: text,
        id: eventId
    };

    // if the events array contains nothing, simply push new event
    if (!events) {
        events = [];
        events.push(event);
    }
    else {
        // loop through events and delete any existing event with matching id
        for (i = 0; i < events.length; i++) {
            if (events[i].id === event.id) {
                events.splice(i, 1);
            }
        };
        events.push(event);
    }

    saveEvents();
});

let loadEvents = function() {
    // get events from localStorage
    events = JSON.parse(localStorage.getItem('events'));

    if (!events) {
        return false;
    }

    // loop over events and send them to createEvent
    for (i = 0; i < events.length; i++) {
        let text = events[i].text;
        let id = events[i].id;
        createEvent(text, id);
    }

    auditSchedule();
};

let createEvent = function(text, id) {
    $('#' + id).val(text);
}

// update the color coding every 60 seconds
setInterval(function() {
    auditSchedule();
}, (1000 * 60));

// load events from localStorage
loadEvents();