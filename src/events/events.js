const monthArray = [
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
}

function createDateObj(offset) {
  const dateObj = {};
  let currentMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  currentMonth.setMonth(currentMonth.getMonth() + offset);
  dateObj["Current Month"] = currentMonth;
  dateObj["Day of 1"] = currentMonth.getDay();
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  currentMonth.setDate(0);
  dateObj["Days in Month"] = currentMonth.getDate();
  return dateObj;
}

function displayEvent(x) {
  const eventWindow = document.getElementById("event-popup");
  const elementDate =
    x.parentElement.parentElement.children[0].getAttribute("date");
  const elementTime = x.parentElement.getAttribute("time");
  const hiddenElement = Array.from(
    document.querySelectorAll(`div[date='${elementDate}']`),
  ).filter((e) => {
    if (e.querySelector("[calendar-role='start']").innerText.includes(":"))
      return (
        e.querySelector("[calendar-role='start']").innerText ==
        elementTime.trim()
      );
    else
      return (
        e
          .querySelector("[calendar-role='start']")
          .innerText.replace(" ", ":00 ") == elementTime.trim()
      );
  })[0];
  const hiddenElementDate = hiddenElement.getAttribute("date");

  Array.from(["title", "start", "end", "description"]).forEach((role) => {
    eventWindow.querySelector(`[calendar-role='${role}']`).innerText =
      hiddenElement.querySelector(`[calendar-role='${role}']`).innerText || "";
  });

  if (hiddenElement.querySelector("[calendar-role='registration-link']")) {
    eventWindow.querySelector("[calendar-role='registration-link']").href =
      hiddenElement.querySelector("[calendar-role='registration-link']").href;
  } else {
    eventWindow.querySelector("[calendar-role='registration-link']").href = "";
  }

  eventWindow.querySelector("[calendar-role='date']").innerText = `${
    monthArray[hiddenElementDate.split("-")[1] - 1]
  } ${hiddenElementDate.split("-")[2].slice(1, 3)}, ${
    hiddenElementDate.split("-")[0]
  }`;

  eventWindow.showModal();
}
function hideEvent() {
  document.getElementById("event-popup").close();
}
function createCalendar(dateObject) {
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    (e) => e.removeEventListener("click", () => displayEvent(e)),
  );
  const calendarArray = [];

  for (
    let i = 1 - dateObject["Day of 1"];
    i <= dateObject["Days in Month"];
    i++
  ) {
    let dateString = `${dateObject["Current Month"].getFullYear()}-${String(
      dateObject["Current Month"].getMonth() + 1,
    ).padStart(2, "0")}-${String(i).padStart(3, "0")}`;
    const dateMatch = Array.from(
      document.querySelectorAll(`[date='${dateString}']`),
    );
    dateMatch.sort((a, b) => {
      let one = a
        .querySelector("[calendar-role='start']")
        .innerText.replace(":", "");
      let two = b
        .querySelector("[calendar-role='start']")
        .innerText.replace(":", "");
      one = one.split(" ");
      one[1].includes("PM")
        ? (one = Number(one[0]) + 12)
        : (one = Number(one[0]));
      two = two.split(" ");
      two[1].includes("PM")
        ? (two = Number(two[0]) + 12)
        : (two = Number(two[0]));
      return one - two;
    });
    let formattedTime;
    if (dateMatch.length) {
      formattedTime = dateMatch.map((date) =>
        timeFormatter(date.querySelector("[calendar-role='start']").innerText),
      );
    }
    console.log(formattedTime);
    console.log(dateMatch);
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
                  ? date
                      .querySelector("[calendar-role='subtitle']")
                      .innerHTML.replaceAll("/", "/<wbr />")
                  : formattedTime[index]
              } </span></p>`,
          )
          .join("")}</div>`,
      );
    }
  }
  while (calendarArray.length != 42) {
    calendarArray.push("<div class='non-month-day' ></div>");
  }
  document.getElementById("calendar-body").innerHTML = "";
  calendarArray.forEach(
    (e) => (document.getElementById("calendar-body").innerHTML += e),
  );

  document.getElementById("month-name").innerText = `${
    monthArray[dateObject["Current Month"].getMonth()]
  } ${dateObject["Current Month"].getFullYear()}`;
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    (e) => e.addEventListener("click", (x) => displayEvent(e)),
  );

  return calendarArray;
}

function changeMonth(amount) {
  monthOffset += amount;
  createCalendar(createDateObj(monthOffset));
}

let monthOffset = 0;
createCalendar(createDateObj(monthOffset));

const todaysDate = new Date();
const todaysDateString = `${todaysDate.getFullYear()}-${String(
  todaysDate.getMonth() + 1,
).padStart(2, "0")}-${String(todaysDate.getDate()).padStart(3, "0")}`;

Array.from(document.querySelectorAll("#event-list>div")).forEach((evnt) => {
  if (todaysDateString > evnt.getAttribute("date")) {
    evnt.style.display = "none";
  }
});
