export const getFeed = async () => {
    const response = await fetch('./api/post/GetAll');
    if (!response.ok) throw Error("Error fetching feed data");
    const data = await response.json();
    return data;
}

const getDateDifference = (date) => date - Date.now();
const getDateDifferenceMin = (date) => getDateDifference(date)/ 60000;
const getDateDifferenceHours = (date) => getDateDifference(date)/ 3600000;
const getDateDifferenceDays = (date) => getDateDifference(date)/86400000;
const getDateDifferenceWeeks = (date) => getDateDifferenceDays(date)/7;

export const displayDateCreated = (date) => {
    const currentDate = new Date();
    const dateMilli = currentDate.getMilliseconds(); - date.getMilliseconds();
    console.log("dateMilli:",dateMilli);
    if(dateMilli < 60000) return "posted just now";
    else if(dateMilli > 60000 && date <= 3600000) return `${getDateDifferenceMin(date)} minute(s) ago`;
    else if(dateMilli > 3600000 && date <= 86400000) return `${getDateDifferenceHours(date)} hour(s) ago`;
    else if(dateMilli > 86400000 && date <= 86400000*7) return `${getDateDifferenceWeeks(date)} week(s) ago`;
    else if (date.getFullYear() == currentDate.getFullYear()) return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    else return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

}