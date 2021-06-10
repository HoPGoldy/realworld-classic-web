import { useState, createContext } from 'react';
 
export const userContext = createContext();

/**
 * 全局注入用户登录信息
 */
export const LoginProvider = props => {
    const [userInfo, setUserInfo] = useState(undefined);
 
    return (
        <userContext.Provider value={{ userInfo, setUserInfo }}>
            {props.children}
        </userContext.Provider>
    );
};