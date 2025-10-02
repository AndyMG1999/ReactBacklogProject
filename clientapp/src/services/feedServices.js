export const getFeed = async () => {
    const response = await fetch('./api/post/GetAll');
    if (!response.ok) throw Error("Error fetching feed data");
    const data = await response.json();
    return data;
}