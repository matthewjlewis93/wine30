"use strict";

var monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function timeFormatter(time) {
  if (time.includes(":")) {
    return time;
  }
  return time.replace(" ", ":00 ");
};
function createDateObj(offset) {
  var dateObj = {};
  var currentMonth = new Date(
    ""
      .concat(new Date().getFullYear(), ", ")
      .concat(new Date().getMonth() + 1, ", 1"),
  );
  currentMonth.setMonth(currentMonth.getMonth() + offset);
  dateObj["Current Month"] = currentMonth;
  dateObj["Day of 1"] = currentMonth.getDay();
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  currentMonth.setDate(0);
  dateObj["Days in Month"] = currentMonth.getDate();
  return dateObj;
};
function displayEvent(x) {
  var eventWindow = document.getElementById("event-popup");
  var elementDate =
    x.parentElement.parentElement.children[0].getAttribute("date");
  var elementTime = x.parentElement.getAttribute("time");
  var hiddenElement = Array.from(
    document.querySelectorAll("div[date='".concat(elementDate, "']")),
  ).filter(function (e) {
    return (
      e
        .querySelector("[calendar-role='start']")
        .innerText.replace(/(?<!:\d\d)\s/, ":00 ") == elementTime.trim()
    );
  })[0];
  var hiddenElementDate = hiddenElement.getAttribute("date");
  Array.from(["title", "start", "end", "description"]).forEach(function (role) {
    eventWindow.querySelector("[calendar-role='".concat(role, "']")).innerText =
      hiddenElement.querySelector("[calendar-role='".concat(role, "']"))
        .innerText || "";
  });
  if (hiddenElement.querySelector("[calendar-role='registration-link']")) {
    eventWindow.querySelector("[calendar-role='registration-link']").href =
      hiddenElement.querySelector("[calendar-role='registration-link']").href;
  } else {
    eventWindow.querySelector("[calendar-role='registration-link']").href = "";
  }
  eventWindow.querySelector("[calendar-role='date']").innerText = ""
    .concat(monthArray[hiddenElementDate.split("-")[1] - 1], " ")
    .concat(hiddenElementDate.split("-")[2].slice(1, 3), ", ")
    .concat(hiddenElementDate.split("-")[0]);
  eventWindow.showModal();
};
function hideEvent() {
  document.getElementById("event-popup").close();
};
function createCalendar(dateObject) {
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    function (e) {
      return e.removeEventListener("click", function () {
        return displayEvent(e);
      });
    },
  );
  var calendarArray = [];
  function _loop(i) {
    var dateString = ""
      .concat(dateObject["Current Month"].getFullYear(), "-")
      .concat(
        String(dateObject["Current Month"].getMonth() + 1).padStart(2, "0"),
        "-",
      )
      .concat(String(i).padStart(3, "0"));
    var dateMatch = Array.from(
      document.querySelectorAll("[date='".concat(dateString, "']")),
    );
    // let formattedDate;
    var formattedTime;
    if (dateMatch.length) {
      formattedTime = dateMatch
        .map(function (date) {
          return timeFormatter(
            date.querySelector("[calendar-role='start']").innerText,
          );
        })
        .sort();
    }
    if (i <= 0) {
      calendarArray.push("<div class='non-month-day' ></div");
    } else {
      calendarArray.push(
        "<div class='calendar-day'><p class='day-of-month' date="
          .concat(dateString, " class=")
          .concat(
            monthOffset === 0
              ? new Date().getDate() === i
                ? " todays-date"
                : ""
              : "",
            ">",
          )
          .concat(i, "</p>")
          .concat(
            dateMatch
              .map(function (date, index) {
                return "<p time='"
                  .concat(
                    formattedTime[index],
                    "'  class='calendar-event-preview' onclick='displayEvent' ><span style='cursor: pointer; background-color: white; border-top-left-radius: 2px; border-bottom-left-radius: 2px; padding: 1px' >\u2757</span><span style='cursor: pointer; background-color: #eee; border-top-right-radius: 2px; border-bottom-right-radius: 2px; padding: 1px' > ",
                  )
                  .concat(
                    date.querySelector("[calendar-role='subtitle']")
                      ? date
                          .querySelector("[calendar-role='subtitle']")
                          .innerHTML.replaceAll("/", "/<wbr />")
                      : formattedTime[index],
                    " </span></p>",
                  );
              })
              .join(""),
            "</div>",
          ),
      );
    }
  };
  for (let i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    _loop(i);
  }
  while (calendarArray.length != 42) {
    calendarArray.push("<div class='non-month-day' ></div>");
  }
  document.getElementById("calendar-body").innerHTML = "";
  calendarArray.forEach(function (e) {
    return (document.getElementById("calendar-body").innerHTML += e);
  });
  document.getElementById("month-name").innerText = ""
    .concat(monthArray[dateObject["Current Month"].getMonth()], " ")
    .concat(dateObject["Current Month"].getFullYear());
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    function (e) {
      return e.addEventListener("click", function (x) {
        return displayEvent(e);
      });
    },
  );
  return calendarArray;
};
function changeMonth(amount) {
  monthOffset += amount;
  createCalendar(createDateObj(monthOffset));
};
var monthOffset = 0;
createCalendar(createDateObj(monthOffset));
var todaysDate = new Date();
var todaysDateString = ""
  .concat(todaysDate.getFullYear(), "-")
  .concat(String(todaysDate.getMonth() + 1).padStart(2, "0"), "-")
  .concat(String(todaysDate.getDate()).padStart(3, "0"));
Array.from(document.querySelectorAll("#event-list>div")).forEach(
  function (evnt) {
    if (todaysDateString > evnt.getAttribute("date")) {
      evnt.style.display = "none";
    }
  },
);
