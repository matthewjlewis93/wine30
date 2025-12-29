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

timeFormatter = (time) => {
  if (time.includes(":")) {
    return time;
  }
  return time.replace(" ", ":00 ");
};

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

displayEvent = (x) => {
  const eventWindow = document.getElementById("event-popup");
  const elementDate =
    x.parentElement.parentElement.children[0].getAttribute("date");
  const elementTime = x.parentElement.getAttribute("time");


  const hiddenElement = Array.from(
    document.querySelectorAll(`div[date='${elementDate}']`)
  ).filter(
    (e) =>
      e
        .querySelector("[calendar-role='start']")
        .innerText.replace(/(?<!:00)\s/, ":00 ") == elementTime.trim()
  )[0];

  const hiddenElementDate = hiddenElement.getAttribute("date");

  Array.from(["title", "start", "end", "description"]).forEach((role) => {
    eventWindow.querySelector(`[calendar-role='${role}']`).innerText =
      hiddenElement.querySelector(`[calendar-role='${role}']`).innerText || "";
  });

  if (hiddenElement.querySelector("[calendar-role='registration-link']")) {
    eventWindow.querySelector("[calendar-role='registration-link']").href =
      hiddenElement.querySelector(
        "[calendar-role='registration-link']"
      ).href;
    eventWindow.querySelector("[calendar-role='registration-link']").style.visibility = "visible";
  } else {
    eventWindow.querySelector("[calendar-role='registration-link']").href = "";
    eventWindow.querySelector(
      "[calendar-role='registration-link']"
    ).style.visibility = "hidden";
  };

  eventWindow.querySelector("[calendar-role='date']").innerText = `${
    monthArray[hiddenElementDate.split("-")[1] - 1]
  } ${hiddenElementDate.split("-")[2].slice(1, 3)}, ${
    hiddenElementDate.split("-")[0]
  }`;

  eventWindow.style.visibility = "visible";
};
hideEvent = () => {
  document.getElementById("event-popup").style.visibility = "hidden";
  document.getElementById("calendar-registration").style.visibility = "hidden"
};

createCalendar = (dateObject) => {
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    (e) => e.removeEventListener("click", () => displayEvent(e))
  );
  const calendarArray = [];

  for (i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    let dateString = `${dateObject["Current Month"].getFullYear()}-${String(
      dateObject["Current Month"].getMonth() + 1
    ).padStart(2, "0")}-${String(i).padStart(3, "0")}`;
    const dateMatch = Array.from(
      document.querySelectorAll(`[date='${dateString}']`)
    );
    // let formattedDate;
    let formattedTime;
    if (dateMatch.length) {
      formattedTime = dateMatch
        .map((date) =>
          timeFormatter(date.querySelector("[calendar-role='start']").innerText)
        )
        .sort();
    }

    if (i <= 0) {
      calendarArray.push("<div class='non-month-day' ></div");
    } else {
      calendarArray.push(
        `<div class='calendar-day'><p class='day-of-month' date=${dateString} class=${
          monthOffset === 0
            ? new Date().getDate() === i
              ? " todays-date"
              : ""
            : ""
        }>${i}</p>${dateMatch
          .map(
            (date, index) =>
              `<p time='${
                formattedTime[index]
              }'  class='calendar-event-preview' onclick='displayEvent' ><span style='cursor: pointer; background-color: white; border-top-left-radius: 2px; border-bottom-left-radius: 2px; padding: 1px' >❗</span><span style='cursor: pointer; background-color: #eee; border-top-right-radius: 2px; border-bottom-right-radius: 2px; padding: 1px' > ${
                date.querySelector("[calendar-role='subtitle']")
                  ? date.querySelector("[calendar-role='subtitle']").innerText
                  : formattedTime[index]
              } </span></p>`
          )
          .join("")}</div>`
      );
    }
  }
  while (calendarArray.length != 42) {
    calendarArray.push("<div class='non-month-day' ></div>");
  }
  document.getElementById("calendar-body").innerHTML = "";
  calendarArray.forEach(
    (e) => (document.getElementById("calendar-body").innerHTML += e)
  );
  document.getElementById("month-name").innerText = `${
    monthArray[dateObject["Current Month"].getMonth()]
  } ${dateObject["Current Month"].getFullYear()}`;

  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    (e) => e.addEventListener("click", (x) => displayEvent(e))
  );

  return calendarArray;
};

changeMonth = (amount) => {
  monthOffset += amount;
  createCalendar(createDateObj(monthOffset));
};

let monthOffset = 0;

createCalendar(createDateObj(monthOffset));

const todaysDate = new Date();
const todaysDateString = `${todaysDate.getFullYear()}-${String(
  todaysDate.getMonth() + 1
).padStart(2, "0")}-${String(todaysDate.getDate()).padStart(3, "0")}`;

Array.from(document.querySelectorAll("#event-list>div")).forEach((evnt) => {
  if (todaysDateString > evnt.getAttribute("date")) {
    evnt.style.display = "none";
  }
});
