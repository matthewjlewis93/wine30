[...document.getElementsByClassName("schedule-day")].forEach((day, index) => {
  if (
    new Date().getDay() === [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 0, 0][index]
  ) {
    day.classList.add("current-day");
  }
});

const monthArray = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

createDateObj = (offset) => {
  const dateObj = {};
  let currentMonth = new Date(
    `${new Date().getFullYear()}, ${new Date().getMonth()+1}, 1`
  );
  currentMonth.setMonth(currentMonth.getMonth() + offset);
  dateObj["Current Month"] = currentMonth;
  dateObj["Day of 1"] = currentMonth.getDay();
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  currentMonth.setDate(0);
  dateObj["Days in Month"] = currentMonth.getDate();
  return dateObj;
};

createCalendar = (dateObject) => {
  document.getElementById(
    "calendar-body"
  ).innerHTML = '';
  const calendarArray = [];
  for (i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    if (i <= 0) {
      calendarArray.push("<div class='calendar-day' ></div");
    } else {
      calendarArray.push(
        `<div class='calendar-day'><p class=${
          monthOffset === 0
            ? new Date().getDate() === i
              ? " todays-date"
              : ""
            : ""
        }>${i}</p></div>`
      );
    }
  }
  while ( calendarArray.length % 7 != 0 ) {
    calendarArray.push("<div class='calendar-day' ></div>");
  }
  calendarArray.forEach(
    (e) => (document.getElementById("calendar-body").innerHTML += e)
  );
  document.getElementById("month-name").innerText = `${monthArray[dateObject["Current Month"].getMonth()]} ${dateObject["Current Month"].getFullYear()}`
  return calendarArray;
};

changeMonth = (amount) => {
  monthOffset += amount;
  createCalendar(createDateObj(monthOffset));
}

let monthOffset = 0;

createCalendar(createDateObj(monthOffset));
