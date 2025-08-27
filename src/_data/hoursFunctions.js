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
  }
};