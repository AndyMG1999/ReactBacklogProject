export const getFeed = async () => {
    const response = await fetch('./api/post/GetAll');
    if (!response.ok) throw Error("Error fetching feed data");
    const data = await response.json();
    return data;
}

const getDateDifference = (dateMilli) => Date.now() - dateMilli;
const getDateDifferenceMin = (dateMilli) => getDateDifference(dateMilli)/ 60000;
const getDateDifferenceHours = (dateMilli) => getDateDifference(dateMilli)/ 3600000;
const getDateDifferenceDays = (dateMilli) => getDateDifference(dateMilli)/86400000;
const getDateDifferenceWeeks = (dateMilli) => getDateDifferenceDays(dateMilli)/7;

export const displayDateCreated = (date) => {
    const currentDate = new Date();
    const dateMilli = date.getTime();
    console.log("timeDifference:",Date.now()-dateMilli);
    if(dateMilli <= 60000) return "posted just now";
    else if(dateMilli > 60000 && dateMilli < 3600000) return `${getDateDifferenceMin(dateMilli)} minute(s) ago`;
    else if(dateMilli >= 3600000 && dateMilli < 86400000) return `${getDateDifferenceHours(dateMilli)} hour(s) ago`;
    else if(dateMilli >= 86400000 && dateMilli < 86400000*7) return `${getDateDifferenceWeeks(dateMilli)} week(s) ago`;
    else if (date.getFullYear() == currentDate.getFullYear()) return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    else return `${date.toDateString()}`;

}