[...document.getElementsByClassName("schedule-day")].forEach((day, index) => {
  if (
    new Date().getDay() === [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 0, 0][index]
  ) {
    day.classList.add("current-day");
  }
});
