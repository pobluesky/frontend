import React, { createContext, useState, useEffect } from 'react';
import { getCookie, removeCookie } from '../../apis/utils/cookies';
import { useRecoilState } from 'recoil';
import { userEmail, userPassword } from '../../index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [didLogin, setDidLogin] = useState(false);
    const [role, setRole] = useState(null);
    const [, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isInitiated, setIsInitiated] = useState(false);

    const [, setGlobalEmail] = useRecoilState(userEmail);
    const [, setGlobalPassword] = useRecoilState(userPassword);

    const removeUserInfo = () => {
        removeCookie('userName', { path: '/' });
        removeCookie('userRole', { path: '/' });
        removeCookie('userId', { path: '/' });
    };

    useEffect(() => {
        const token = getCookie('accessToken');
        const currentUserRole = getCookie('userRole');
        const currentUserId = getCookie('userId');

        if (token) {
            setToken(token);
            setDidLogin(true);
            setRole(currentUserRole);
            setUserId(currentUserId);
            setIsInitiated(true);
            return;
        }

        removeUserInfo();
    }, []);

    /*
    useEffect(() => {
        if (
            typeof getCookie('accessToken') === 'undefined' ||
            (isInitiated && !didLogin)
        ) {
            removeUserInfo();
        }
    }, [didLogin, isInitiated]);
    */

    if (
        typeof getCookie('accessToken') === 'undefined' ||
        (isInitiated && !didLogin)
    ) {
        removeUserInfo();
    }

    const logout = () => {
        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });

        removeUserInfo();

        setRole(null);
        setToken(null);
        setUserId(null);

        setGlobalEmail('');
        setGlobalPassword('');

        setDidLogin(false);

        localStorage.clear();
        sessionStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                didLogin,
                role,
                logout,
                setDidLogin,
                setRole,
                userId,
                setUserId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
