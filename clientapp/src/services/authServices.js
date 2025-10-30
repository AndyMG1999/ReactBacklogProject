export const registerUser = async (email,userName,password) => {
    const response = await fetch("./api/account/register",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
        }),
    });
    return response;
}

export const loginUser = async (email,password) => {
    const response = await fetch("./api/account/login",{
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    return response;
}

export const getUserInfo = async () => {
    const response = await fetch("./api/account/getUserInfo",{
        'method': 'GET',
    });
    if(!response.ok) throw Error("Error getting user info");
    const data = await response.json();
    return data;
}

export const logoutUser = async () => {
    const response = await fetch("./api/account/logout",{
        method: "POST",
    });
    if(!response.ok) throw Error("Error Logging Out User :(");
    return response;
}