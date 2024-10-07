import React, { createContext, useState, useEffect } from 'react';
import { getCookie, removeCookie } from '../../apis/utils/cookies';
import { useRecoilState } from 'recoil';
import { userEmail, userPassword } from '../../index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [didLogin, setDidLogin] = useState(false);

    const [, setGlobalEmail] = useRecoilState(userEmail);
    const [, setGlobalPassword] = useRecoilState(userPassword);

    const logout = () => {
        window.location.href = '/login';

        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });
        removeCookie('userName', { path: '/' });
        removeCookie('userRole', { path: '/' });
        removeCookie('userId', { path: '/' });

        setRole(null);
        setToken(null);
        setUserId(null);

        setGlobalEmail('');
        setGlobalPassword('');

        setDidLogin(false);

        localStorage.clear();
        sessionStorage.clear();
    };

    useEffect(() => {
        if (getCookie('accessToken')) {
            setToken(getCookie('accessToken'));
            setDidLogin(true);
            setRole(getCookie('userRole'));
            setUserId(getCookie('userId'));
            return;
        }
    }, []);

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
