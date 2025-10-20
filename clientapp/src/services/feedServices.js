export const getFeed = async () => {
    const response = await fetch('./api/post/GetAll');
    if (!response.ok) throw Error("Error fetching feed data");
    const data = await response.json();
    return data;
}

const getDateDifference = (milliDifference) => milliDifference;
const getDateDifferenceMin = (dateMilli) => Math.floor(getDateDifference(dateMilli)/ 60000);
const getDateDifferenceHours = (dateMilli) => Math.floor(getDateDifference(dateMilli)/ 3600000);
const getDateDifferenceDays = (dateMilli) => Math.floor(getDateDifference(dateMilli)/86400000);
const getDateDifferenceWeeks = (dateMilli) => Math.floor(getDateDifferenceDays(dateMilli)/7);

export const displayDateCreated = (date) => {
    const currentDate = new Date();
    const dateMilli = date.getTime();
    const timeDifference = Date.now() - dateMilli;
    
    if(timeDifference <= 60000) return "posted just now";
    else if(timeDifference > 60000 && timeDifference < 3600000) return `${getDateDifferenceMin(timeDifference)} minute(s) ago`;
    else if(timeDifference >= 3600000 && timeDifference < 86400000) return `${getDateDifferenceHours(timeDifference)} hour(s) ago`;
    else if(timeDifference >= 86400000 && timeDifference < 604800000) return `${getDateDifferenceDays(timeDifference)} day(s) ago`;
    else if(timeDifference >= 604800000 && timeDifference < 31536000000) return `${getDateDifferenceWeeks(timeDifference)} week(s) ago`;
    else if (date.getFullYear() == currentDate.getFullYear()) return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`;
    else return `${date.toDateString()}`;

}