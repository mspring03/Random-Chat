function formatDate(){
    const newDate = new Date();

    const sMonth = padValue(newDate.getMonth() + 1);
    const sDay = padValue(newDate.getDate());
    let sYear = newDate.getFullYear();
    let sHour = newDate.getHours();
    const sMinute = padValue(newDate.getMinutes());
    let sAMPM = "AM";

    const iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }

    sHour = padValue(sHour);

    return sYear + "/" + sMonth + "/" + sDay + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
    return (value < 10) ? "0" + value : value;
}

export default formatDate;