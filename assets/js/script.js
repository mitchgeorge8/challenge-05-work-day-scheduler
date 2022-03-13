let DateTime = luxon.DateTime;

const now = DateTime.now();

$("#currentDay").text(now.toLocaleString(DateTime.DATE_HUGE));

let auditSchedule = function() {
    for (i = 8; i < 21; i++) {
        let hourNow = now.toFormat('H');
        let block = $("#block-" + i);

        if (i < hourNow) {
            block.addClass("past");
            block.removeClass("present");
            block.removeClass("future");
        }
        else if (i == hourNow) {
            block.removeClass("past");
            block.addClass("present");
            block.removeClass("future");
        }
        else if (i > hourNow) {
            block.removeClass("past");
            block.removeClass("present");
            block.addClass("future");
        }
    };
};

auditSchedule();