[...document.getElementsByClassName("schedule-day")].forEach((day, index) => {
  if (
    new Date().getDay() === [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 0, 0][index]
  ) {
    day.classList.add("current-day");
  }
});

createDateObj = (dateIndex) => {
  const dateObj = {};
  let currentMonth = new Date(
    `${new Date().getFullYear()}, ${dateIndex + 1}, 1`
  );
  dateObj["Current Month"] = currentMonth;
  dateObj["Day of 1"] = currentMonth.getDay();
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  currentMonth.setDate(0);
  dateObj["Days in Month"] = currentMonth.getDate();
  return dateObj;
};

createCalendar = (dateObject) => {
  document.getElementById(
    "calendar"
  ).innerHTML = `<h3 style="grid-column: span 7;">Calendar</h3><p>Sun</p>
    <p>Mon</p>
    <p>Tues</p>
    <p>Wed</p>
    <p>Thurs</p>
    <p>Fri</p>
    <p>Sat</p>`;
  const calendarArray = [];
  for (i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    if (i <= 0) {
      calendarArray.push("<div class='calendar-day' ></div");
    } else {
      calendarArray.push(`<div class='calendar-day' ><p>${i}</p></div>`);
    }
  }
  while ( calendarArray.length % 7 != 0 ) {
    calendarArray.push("<div class='calendar-day' ></div>");
  }
  calendarArray.forEach(
    (e) => (document.getElementById("calendar").innerHTML += e)
  );
  return calendarArray;
};

createCalendar(createDateObj(new Date().getMonth()));
// createCalendar(createDateObj(7));
