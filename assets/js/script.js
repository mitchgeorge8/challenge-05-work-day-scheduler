let DateTime = luxon.DateTime;

const now = DateTime.now();

$("#currentDay").text(now.toLocaleString(DateTime.DATE_HUGE));