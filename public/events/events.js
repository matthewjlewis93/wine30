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

displayEvent = (x) => {
  const eventWindow = document.getElementById("event-popup");
  const elementDate =
    x.parentElement.parentElement.children[0].getAttribute("date");
  const elementTime = x.innerText.includes(" ")
    ? x.innerText
    : x.nextSibling.innerText;

  const hiddenElement = Array.from(
    document.querySelectorAll(`div[date='${elementDate}']`)
  ).filter(
    (e) =>
      e.querySelector("[calendar-role='start']").innerText == elementTime.trim()
  )[0];

  const hiddenElementDate = hiddenElement.children[5].innerText;
  // const dateString = `${
  //   monthArray[hiddenElementDate.getMonth()]
  // } ${hiddenElementDate.getDate()}\n${hiddenElementDate.toLocaleTimeString([], {
  //   hour12: "true",
  //   hour: "numeric",
  //   minute: "2-digit",
  // })}`;

  eventWindow.innerHTML = hiddenElement.innerHTML;
  eventWindow.children[5].innerText = `${monthArray[hiddenElementDate.split('-')[1]-1]} ${hiddenElementDate.split('-')[2]}, ${hiddenElementDate.split('-')[0]}`
  eventWindow.style.visibility = "visible";
};
hideEvent = () => {
  document.getElementById("event-popup").style.visibility = "hidden";
};

createCalendar = (dateObject) => {
  Array.from(document.querySelectorAll(".calendar-event-preview>span")).forEach(
    (e) => e.removeEventListener("click", () => displayEvent(e))
  );
  const calendarArray = [];

  for (i = 1 - dateObject["Day of 1"]; i <= dateObject["Days in Month"]; i++) {
    let dateString = `${dateObject["Current Month"].getFullYear()}-${
      dateObject["Current Month"].getMonth() + 1
    }-${String(i).padStart(3, "0")}`;
    const dateMatch = Array.from(document.querySelectorAll(`[date='${dateString}']`));
    let formattedDate;
    let formattedTime;
    if (dateMatch.length) {
      formattedDate = new Date(dateMatch[0].children[2].innerText);
      formattedTime = dateMatch.map(date => date.querySelector("[calendar-role='start']").innerText ).sort();
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
        }>${i}</p>${
          dateMatch.map((date, index) =>
             `<p class='calendar-event-preview' onclick='displayEvent' ><span style='cursor: pointer; background-color: white; border-top-left-radius: 2px; border-bottom-left-radius: 2px; padding: 1px' >❗</span><span style='cursor: pointer; background-color: #eee; border-top-right-radius: 2px; border-bottom-right-radius: 2px; padding: 1px' > ${formattedTime[index]} </span></p>`).join('')
            
        }</div>`
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
