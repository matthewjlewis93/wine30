module.exports = {
  getDisplayHours(day) {
    if (day.open) {
      return `${day.openTime} - ${day.closeTime}`;
    }
    return "Closed";
  },
  getCurrentDay(day) {
    if (
      day.title ===
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][new Date().getDay()]
    ) {
      return "current-day";
    }
    return "";
  },
  sortDays(hoursObj) {
    let dayArr = Object.values(hoursObj);
    dayArr.sort((a,b) => a.order - b.order)
    return dayArr;
  }
};