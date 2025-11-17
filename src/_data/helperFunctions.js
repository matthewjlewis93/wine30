module.exports = {
  getDisplayHours(day) {
    if (day.open) {
      return `${day.openTime} - ${day.closeTime}`;
    }
    return "Closed";
  },
  sortDays(hoursObj) {
    let dayArr = Object.values(hoursObj);
    dayArr.sort((a, b) => a.order - b.order);
    return dayArr;
  },
  dateProcessor(objWithDate) {

    let processedObj = {
      ...objWithDate,
      month: String(Number(objWithDate.date.slice(5, 7))),
      day: objWithDate.date.slice(8, 10),
      year: objWithDate.date.slice(0, 4),
    };

    return processedObj;
  },
};
