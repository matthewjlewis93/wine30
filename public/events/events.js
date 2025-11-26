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
}

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
      e
        .querySelector("[calendar-role='start']")
        .innerText.replace(/(?<!:00)\s/, ":00 ") == elementTime.trim()
  )[0];

  const hiddenElementDate = hiddenElement.getAttribute("date")

  Array.from(["title", "start", "end"]).forEach(role => {
    eventWindow.querySelector(`[calendar-role='${role}']`).innerText = hiddenElement.querySelector(`[calendar-role='${role}']`).innerText || '';
  }
  )
  // eventWindow.innerText = hiddenElement.querySelector()
  eventWindow.children[5].innerText = `${
    monthArray[hiddenElementDate.split("-")[1] - 1]
  } ${hiddenElementDate.split("-")[2].slice(1,3) }, ${hiddenElementDate.split("-")[0]}`;
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
    const dateMatch = Array.from(
      document.querySelectorAll(`[date='${dateString}']`)
    );
    // let formattedDate;
    let formattedTime;
    if (dateMatch.length) {
      // console.dir(dateMatch[0].getAttribute("date"));
      // console.log(dateMatch[0].children[2].innerText);
      // formattedDate = new Date(dateMatch[0].children[2].innerText);
      // console.log(formattedDate);
      formattedTime = dateMatch
        .map((date) => timeFormatter(date.querySelector("[calendar-role='start']").innerText))
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
              `<p class='calendar-event-preview' onclick='displayEvent' ><span style='cursor: pointer; background-color: white; border-top-left-radius: 2px; border-bottom-left-radius: 2px; padding: 1px' >❗</span><span style='cursor: pointer; background-color: #eee; border-top-right-radius: 2px; border-bottom-right-radius: 2px; padding: 1px' > ${formattedTime[index]} </span></p>`
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

// document.getElementById(
//   "event-list"
// ).innerHTML = Array.from(document.querySelectorAll("[calendar-role='event']")).map(upcoming_event => 
//   `<div style="display: flex; justify-content: space-between; padding: 10px; margin: 0px auto; background-color: hsla(0, 0%, 100%, 0.6); max-width: 1100px; border-radius: 5px; gap: 2px;" >
//               <div style="display: flex; flex-direction: column; justify-content: center; padding-bottom: 1rem; ">
//                   <h3 style="letter-spacing: normal; font-size: 3.5rem;">${upcoming_event.querySelector("[calendar-role='title']").innerText}</h3>
//               </div>
//               <div>
//                   <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;  background-color: hsla(0, 0%, 0%, 0.2); border-radius: 10px; aspect-ratio: 1; height: 8rem; padding-bottom: 0.8rem; " >
//                       <p style="font-size: 3rem; padding: 0px;">Dec</p>
//                       <h3 style="margin: 0px; letter-spacing: -2px;" >08</h3>
//                   </div>
//                   <p style="padding: 0px; font-size: 1.2rem; justify-self: center;" >1 PM - 5 PM</p>
//               </div>
//           </div><br />`).join('');

