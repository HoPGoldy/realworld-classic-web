import { useState, createContext } from 'react';
 
export const userContext = createContext();
 
export const LoginProvider = props => {
    const [userInfo, setUserInfo] = useState(undefined);
 
    return (
        <userContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </userContext.Provider>
    );
};