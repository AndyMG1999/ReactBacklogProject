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
    if(!response.ok) throw Error("Error registering user");
    return response.ok;
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
    if(!response.ok) throw Error("Error registering user");
    return response;
}