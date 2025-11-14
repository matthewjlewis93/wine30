module.exports = {
  getDisplayHours(day) {
    if (day.open) {
      return `${day.openTime} - ${day.closeTime}`;
    }
    return "Closed";
  },
  sortDays(hoursObj) {
    let dayArr = Object.values(hoursObj);
    dayArr.sort((a,b) => a.order - b.order)
    return dayArr;
  },
  dateProcessor (objWithDate) {
    let date = new Date(objWithDate.date)
    date = new Date(`${date.getFullYear()}-${
      date.getMonth() + 1
    }-${String(date.getDate()).padStart(3, "0")}`);

    processedObj = {...objWithDate, month: date.getMonth() +1, day: date.getDate(), year: date.getFullYear() }

    return processedObj
  }

};