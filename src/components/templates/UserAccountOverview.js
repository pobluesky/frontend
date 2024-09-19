import React, { useEffect, useState } from 'react';
import ExistingUserInfo from '../organisms/ExistingUserInfo';
import EditingUserInfo from '../organisms/EditingUserInfo';
import AuthenticateUser from '../organisms/AuthenticateUser';
import { CheckButton } from '../molecules/JoinButton';
import { User_Account_Overview } from '../../assets/css/Auth.css';
import { getCookie } from '../../apis/utils/cookies';
import {
    getUserInfoByCustomers,
    getUserInfoByManagers,
} from '../../apis/api/auth';

export default function UserAccountOverview() {
    const userId = getCookie('userId');
    const role = getCookie('userRole');

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [checkUser, setCheckUser] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [completeEdit, setCompleteEdit] = useState(false);
    const [checkValidationTest, setValidationTest] = useState(false);
    const [tryEdit, setTryEdit] = useState(false);
    const [userDetail, setUserDetail] = useState([]);

    // 사용자 상세 정보 조회 API
    const fetchGetUserInfo =
        role === 'customer'
            ? async () => {
                  try {
                      const response = await getUserInfoByCustomers(userId);
                      setUserDetail(response.data.data);
                  } catch (error) {
                      console.error('고객사 상세 정보 조회 실패: ', error);
                  }
              }
            : async () => {
                  try {
                      const response = await getUserInfoByManagers(userId);
                      setUserDetail(response.data.data);
                  } catch (error) {
                      console.error('담당자 상세 정보 조회 실패: ', error);
                  }
              };

    useEffect(() => {
        fetchGetUserInfo();
    }, []);

    return (
        <div className={User_Account_Overview}>
            {!isAuthenticated ? (
                <>
                    <AuthenticateUser
                        userDetail={userDetail}
                        setAuthenticated={setAuthenticated}
                        checkUser={checkUser}
                    />
                    <div>
                        <CheckButton
                            btnName={'회원 인증'}
                            onClick={() => {
                                setCheckUser(!checkUser);
                            }}
                            margin={'24px 0 0 0'}
                        />
                    </div>
                </>
            ) : (
                <>
                    {!isEditing ? (
                        <ExistingUserInfo
                            userDetail={userDetail}
                            checkUser={checkUser}
                            setCheckUser={setCheckUser}
                        />
                    ) : (
                        <EditingUserInfo
                            userDetail={userDetail}
                            completeEdit={completeEdit}
                            setCompleteEdit={setCompleteEdit}
                            checkValidationTest={checkValidationTest}
                            setValidationTest={setValidationTest}
                            tryEdit={tryEdit}
                            setTryEdit={setTryEdit}
                        />
                    )}
                    <div>
                        {!isEditing ? (
                            <CheckButton
                                btnName={'계정 정보 수정'}
                                onClick={() => {
                                    setEditing(true);
                                }}
                                margin={'24px 0 0 0'}
                            />
                        ) : (
                            <CheckButton
                                btnName={'수정 완료'}
                                onClick={() => {
                                    setValidationTest(true);
                                    setTryEdit(!tryEdit);
                                }}
                                margin={'24px 0 0 0'}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
