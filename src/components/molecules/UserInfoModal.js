import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import { useAuth } from '../../hooks/useAuth';
import { User_Modal_Container } from '../../assets/css/Header.css';

// 로그아웃 버튼, 회원 정보 탐색 기능
function UserInfoModal() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={User_Modal_Container}>
            <div>
                <Button
                    onClick={() => {
                        navigate('/account');
                    }}
                    btnName={'설정'}
                    width={'fit-content'}
                    height={'40px'}
                    backgroundColor={'#ffffff'}
                    textColor={'#64636a'}
                    border={'solid #64636a 2px'}
                    borderRadius={'12px'}
                    fontSize={'16px'}
                />
                <Button
                    onClick={() => {
                        window.confirm('로그아웃 하시겠습니까?')
                            ? handleLogout()
                            : '';
                    }}
                    btnName={'로그아웃'}
                    width={'fit-content'}
                    height={'40px'}
                    backgroundColor={'#ffffff'}
                    textColor={'#d5dbe2'}
                    border={'solid #d5dbe2 2px'}
                    borderRadius={'12px'}
                    fontSize={'16px'}
                    float={'right'}
                />
            </div>
        </div>
    );
}

export default UserInfoModal;
