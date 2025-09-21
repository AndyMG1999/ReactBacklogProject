export const registerUser = async (email,password) => {
    const response = await fetch("http://localhost:5224/register",{
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
    return response.ok;
}

export const loginUser = async (email,password) => {
    const response = await fetch("http://localhost:5224/login?useCookies=true",{
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