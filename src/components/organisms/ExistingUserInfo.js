import React, { useEffect } from 'react';
import UserInput from '../molecules/JoinInput';
import { User_Account_Exsisting } from '../../assets/css/Auth.css';
import { getCookie } from '../../apis/utils/cookies';

export default function ExistingUserInfo({
    userDetail,
    checkUser,
    setCheckUser,
}) {
    const role = getCookie('userRole');

    const enterKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCheckUser(!checkUser);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', enterKeyDown);
        return () => {
            window.removeEventListener('keydown', enterKeyDown);
        };
    }, [checkUser]);

    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className={User_Account_Exsisting}>
            {role === 'customer' ? (
                <>
                    <div>
                        <UserInput
                            categoryName={'이름'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.name}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'이메일'}
                            type={'email'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.email}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'전화번호'}
                            type={'tel'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.phone}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'고객 코드'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.customerCode}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'고객사명'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.customerName}
                            readOnly={true}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <UserInput
                            categoryName={'이름'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.name}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'이메일'}
                            type={'email'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.email}
                            readOnly={true}
                        />
                    </div>
                    <div>
                        <UserInput
                            categoryName={'전화번호'}
                            password={'tel'}
                            width={'336px'}
                            height={'48px'}
                            padding={'0 0 0 20px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'12px'}
                            fontSize={'16px'}
                            value={userDetail.phone}
                            readOnly={true}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
