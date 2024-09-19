import React, { createContext, useState, useEffect } from 'react';
import { getCookie, removeCookie } from '../../apis/utils/cookies';
import { useRecoilState } from 'recoil';
import { userName, userEmail, userPassword } from '../../index';
import { getUserInfoByCustomers } from '../../apis/api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [didLogin, setDidLogin] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);

    const [, setGlobalName] = useRecoilState(userName);
    const [, setGlobalEmail] = useRecoilState(userEmail);
    const [, setGlobalPassword] = useRecoilState(userPassword);

    const getUserInfo = async () => {
        try {
            const response = await getUserInfoByCustomers(getCookie('userId'));
            setName(response.data.data.name);
            return response.data.data.name;
        } catch (error) {
            console.log('사용자 이름 조회 실패 :', error);
        }
    };
    useEffect(() => {
        // 페이지 새로고침 시 쿠키에서 토큰을 가져와 로그인 상태를 설정
        const token = getCookie('accessToken');
        const currentUserRole = getCookie('userRole');
        const currentUserId = getCookie('userId');

        if (token) {
            // console.log("AuthContext: ", currentUserId);
            // console.log("AuthContext: ", currentUserRole);
            setToken(token);
            setDidLogin(true);
            setRole(currentUserRole);
            setUserId(currentUserId);
            return;
        }
    }, []);

    useEffect(() => {
        if (getCookie('userId')) {
            getUserInfo();
        }
    }, []);

    // 로그아웃 함수
    const logout = () => {
        removeCookie('accessToken', { path: '/' });
        removeCookie('refreshToken', { path: '/' });
        removeCookie('userRole', { path: '/' });
        removeCookie('userId', { path: '/' });

        setRole(null);
        setToken(null);
        setUserId(null);
        setName(null);
        setGlobalName('');
        setGlobalEmail('');
        setGlobalPassword('');

        setDidLogin(false);

        console.log('로그아웃!');
        console.log(getCookie('userRole'));
        console.log(getCookie('userId'));
    };

    // console.log("현재 로그인 상태: ", didLogin);
    // console.log("현재 유저의 role: ", role);
    // console.log("현재 유저의 userId: ", userId);

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
