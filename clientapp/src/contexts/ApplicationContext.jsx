import { useState,createContext } from "react";

export const Context = createContext({
    userInfo: {},
    setUserInfo: () => {},
    isAtTop: false,
    setIsAtTop: () => {},
});

const ApplicationContext = (props) => {
    const [userInfo, setUserInfo] = useState({});
    const [isAtTop, setIsAtTop] = useState(true);
    
    const contextValues = {
        userInfo: userInfo,
        setUserInfo: (value) => setUserInfo(value),
        isAtTop: isAtTop,
        setIsAtTop: (value) => setIsAtTop(value),
    }
    return(
        <Context.Provider value={contextValues}>
            {props.children}
        </Context.Provider>
    )
}

export default ApplicationContext;

