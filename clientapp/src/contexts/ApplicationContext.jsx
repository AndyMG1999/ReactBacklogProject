import { useState,createContext } from "react";

export const AppContext = createContext({
    userInfo: null,
    setUserInfo: () => {},
    isAtTop: false,
    setIsAtTop: () => {},
});

const ApplicationContext = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAtTop, setIsAtTop] = useState(true);
    
    const contextValues = {
        userInfo: userInfo,
        setUserInfo: (value) => setUserInfo(value),
        isAtTop: isAtTop,
        setIsAtTop: (value) => setIsAtTop(value),
    }
    return(
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ApplicationContext;

