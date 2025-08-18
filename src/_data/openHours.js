module.exports = {
    getDisplayHours(day) {
        if (day.open) {
            return `${day.openTime} - ${day.closeTime}`
        }
        return "Closed";
    }
}