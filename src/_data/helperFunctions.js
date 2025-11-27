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

  toTimeString (time) {
    let times = String(time).split(":");
    let timeString = '';
    if (Number(times[0]) > 12) {
      timeString += (Number(times[0]) - 12) + ":" + times[1] + " PM";
    } else {
      timeString += times[0] + ":" + times[1] + " PM";
    }
    return timeString;
  },

  sortEventDates (file) {
    const sortedKeys = Object.keys(file).filter(eventOrHoliday => file[eventOrHoliday].date.slice(0,4) >= new Date().getFullYear()- 1 ).sort((a, b) =>
      `${file[a].date}${file[a].start}`.localeCompare(`${file[b].date}${file[b].start}`)
    );
    const sortedDates = {};
    sortedKeys.forEach( date => sortedDates[date] = file[date] )
    return sortedDates;
  }

};
