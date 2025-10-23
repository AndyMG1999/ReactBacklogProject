export const getAllTags = async () => {
    const response = await fetch("./api/tag/GetAll");
    const data = await response.json();
    return data;
};

export const simplifyTagCount = (tagCount) => {
    if(tagCount < 1000) return tagCount;
    if(tagCount < 1000000) return (tagCount/1000).toFixed(1)+"k";
    if(tagCount < 1000000000) return (tagCount/1000000).toFixed(1)+"m";
    return (tagCount/1000000000).toFixed(1)+"b";
}