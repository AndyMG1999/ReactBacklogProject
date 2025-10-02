import { useState,createContext } from "react";

export const AppContext = createContext({
    userInfo: null,
    setUserInfo: () => {},
    isAtTop: false,
    setIsAtTop: () => {},
    feedData: [],
    setFeedData: () => {},
    addFeedData: () => {},
});

const ApplicationContext = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const [feedData, setFeedData] = useState([]);
    
    const contextValues = {
        userInfo: userInfo,
        setUserInfo: (value) => setUserInfo(value),
        isAtTop: isAtTop,
        setIsAtTop: (value) => setIsAtTop(value),
        feedData: feedData,
        setFeedData: (value) => setFeedData(value),
        addFeedData: (value) => setFeedData(prevValue => [...prevValue,value]),
    }
    return(
        <AppContext.Provider value={contextValues}>
            {props.children}
        </AppContext.Provider>
    )
}

export default ApplicationContext;

