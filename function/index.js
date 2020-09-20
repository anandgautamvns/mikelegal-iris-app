import { MONTHS_NAMES } from '../constants/GeneralConstants';

//--------DATE FORMATION--------
export function standardizeDate(dateString){
    const dateObject = new Date(dateString);
    return (`${dateObject.getDate()} ${MONTHS_NAMES[dateObject.getMonth()]}, ${dateObject.getFullYear()} | ${dateObject.getHours()}:${dateObject.getMinutes()}`);
}

//--------SORTING RECORDS--------
export function sortRecords(records){
    return records.sort((a, b) => {
        const aDate = Date.parse(a.modified);
        const bDate = Date.parse(b.modified);
        return bDate-aDate;
    });
}

//--------CHANGE STATE VARIABLE--------
export function handleChangeState(stateVariable, event){
    this.setState({[stateVariable]: event.target.value});
}

//set Max date (disabled future date)
export function disabledFutureDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

//date format
export function changeCustomDateToCalendar(date) {
    var dateArray = [];
    var convertedDate = "";
    if (checkValue(date)) {
        dateArray = date.split('-');
        convertedDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];   //15-08-2018
    }
    return convertedDate;
}

//check amount/data is null or not global
export function checkValue(value) {
    if (value !== null && value !== "" && value !== undefined && value !== "undefined" && value !== "null" && typeof(value) !== undefined) {
        return true;
    } else {
        return false;
    }
}


export function checkNaN(value) {
    if (isNaN(value)) {
        return false;
    } else {
        return true;
    }
}
