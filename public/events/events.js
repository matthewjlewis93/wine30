const monthArray = [
  "January",
  "Febuary",
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

createDateObj = (offset) => {
  const dateObj = {};
  let currentMonth = new Date(
    `${new Date().getFullYear()}, ${new Date().getMonth() + 1}, 1`
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
  document.getElementById("calendar-body").innerHTML = "";
  const calendarArray = [];
  for (i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    let dateString = `${dateObject["Current Month"].getFullYear()}-${
      dateObject["Current Month"].getMonth() + 1
    }-${String(i).padStart(3, "0")}`;
    const dateMatch = document.querySelector(`[date='${dateString}']`);
    let formattedDate;
    if (dateMatch) {
      formattedDate = new Date(dateMatch.children[2].innerText);
      formattedTime = formattedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: "true"
      })
    }

    if (i <= 0) {
      calendarArray.push("<div class='calendar-day' ></div");
    } else {
      calendarArray.push(
        `<div class='calendar-day'><p date=${dateString} class=${
          monthOffset === 0
            ? new Date().getDate() === i
              ? " todays-date"
              : ""
            : ""
        }>${i}</p>${
          dateMatch
            ? `<p style='font-size: 0.6rem; text-align: center; position: absolute; inset: 0px; width: 100%; height: 100%;' ><span style=' background-color: white; border-top-left-radius: 2px; border-bottom-left-radius: 2px; padding: 2px' >❗</span><span style='background-color: #eee; border-top-right-radius: 2px; border-bottom-right-radius: 2px; padding: 2px'' > ${formattedTime}</span></p>`
            : ""
        }</div>`
      );
    }
  }
  while (calendarArray.length % 7 != 0) {
    calendarArray.push("<div class='calendar-day' ></div>");
  }
  calendarArray.forEach(
    (e) => (document.getElementById("calendar-body").innerHTML += e)
  );
  document.getElementById("month-name").innerText = `${
    monthArray[dateObject["Current Month"].getMonth()]
  } ${dateObject["Current Month"].getFullYear()}`;
  return calendarArray;
};

changeMonth = (amount) => {
  monthOffset += amount;
  createCalendar(createDateObj(monthOffset));
};

let monthOffset = 0;

createCalendar(createDateObj(monthOffset));
