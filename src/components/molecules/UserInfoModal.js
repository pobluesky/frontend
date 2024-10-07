import React from 'react';
import Button from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';
import { User_Modal_Container } from '../../assets/css/Header.css';

function UserInfoModal() {
    const { logout } = useAuth();

    return (
        <div className={User_Modal_Container}>
            <div>
                <Button
                    onClick={() => {
                        window.location.href = '/account';
                    }}
                    btnName={'회원정보'}
                    width={'fit-content'}
                    height={'40px'}
                    backgroundColor={'#ffffff'}
                    textColor={'#64636a'}
                    border={'none'}
                    borderRadius={'12px'}
                    fontSize={'16px'}
                />
                <Button
                    onClick={() => {
                        window.confirm('로그아웃 하시겠습니까?')
                            ? logout()
                            : '';
                    }}
                    btnName={'로그아웃'}
                    width={'fit-content'}
                    height={'40px'}
                    backgroundColor={'#ffffff'}
                    textColor={'#d5dbe2'}
                    border={'none'}
                    borderRadius={'12px'}
                    fontSize={'16px'}
                    float={'right'}
                />
            </div>
        </div>
    );
}

export default UserInfoModal;
