import React, { useEffect, useState } from 'react';
import UserInput from '../molecules/JoinInput';
import { getCookie } from '../../apis/utils/cookies';
import { LoginFailedAlert } from '../../utils/actions';
import { signInApiByUsers } from '../../apis/api/auth';

export default function AuthenticateUser({
    userDetail,
    setAuthenticated,
    checkUser,
}) {
    const [password, setPassword] = useState('');
    const [showFailedAlert, canShowFailedAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const enterKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await GetAuth();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', enterKeyDown);
        return () => {
            window.removeEventListener('keydown', enterKeyDown);
        };
    }, [password]);

    const GetAuth = async () => {
        try {
            await signInApiByUsers(userDetail.email, password);
            setAuthenticated(true);
        } catch (error) {
            setErrorMsg(error.response.data.message);
            canShowFailedAlert(true);
            console.error('회원 인증 실패: ', error.response.data.message);
        }
    };

    useEffect(() => {
        if (checkUser) {
            GetAuth();
        }
    }, [checkUser]);

    return (
        <>
            <div>
                <UserInput
                    categoryName={'비밀번호'}
                    type={'password'}
                    width={'336px'}
                    height={'48px'}
                    padding={'0 0 0 20px'}
                    border={'solid 1px #c1c1c1'}
                    borderRadius={'12px'}
                    fontSize={'16px'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <LoginFailedAlert
                showAlert={showFailedAlert}
                onClose={() => {
                    canShowFailedAlert(false);
                }}
                message={errorMsg}
                inert
            />
        </>
    );
}
