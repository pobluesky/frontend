import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../atoms/Button';
import pobluesky from '../../assets/css/icons/pobluesky.png';
import profile from '../../assets/css/icons/profile.svg';
import UserInfoModal from './UserInfoModal';
import NotificationModal from '../molecules/NotificationModal';
import { useAuth } from '../../hooks/useAuth';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { getCookie } from '../../apis/utils/cookies';
import {
    getNotificationByCustomers,
    getNotificationByManagers,
} from '../../apis/api/notification';
import { Header_Container } from '../../assets/css/Header.css';

export const MenuLink = styled(Link)`
    text-decoration: none;
    color: #25262b;
`;

function MyHeader() {
    const navigate = useNavigate();

    const name = getCookie('userName');
    const userId = getCookie('userId');
    const role = getCookie('userRole');

    const { didLogin } = useAuth();

    const location = useLocation();
    const isMainPage = location.pathname === '/';
    const isLoginPage = location.pathname === '/login';
    const isJoinPage = location.pathname === '/join';
    const isFormPage = location.pathname === '/voc-form/question';
    const [curPage, setCurPage] = useState(location.pathname.substring(1, 4));
    const url = `/inq-list/${role}`;

    const [totalElements, setTotalElements] = useState(0);
    const [openNotifyModal, setOpenNotifyModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const notificationButtonRef = useRef(null);
    const infoButtonRef = useRef(null);
    const modalRef = useRef(null);

    const toggleNotifyModal = () => {
        if (openInfoModal) {
            setOpenInfoModal(false);
        }
        setOpenNotifyModal(!openNotifyModal);
    };

    const toggleInfoModal = () => {
        if (openNotifyModal) {
            setOpenNotifyModal(false);
        }
        setOpenInfoModal(!openInfoModal);
    };

    const fetchNotificationsCount = async () => {
        try {
            if (role === 'customer') {
                const response = await getNotificationByCustomers(userId);
                setTotalElements(response.totalElements);
            } else if (role === 'quality' || role === 'sales') {
                const response = await getNotificationByManagers(userId);
                setTotalElements(response.totalElements);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const InquiryMenu = () => (
        <>
            <div>
                {role === 'quality' ? (
                    <MenuLink to={url}>품질설계연계조회</MenuLink>
                ) : (
                    <MenuLink to={url}>Inquiry 조회</MenuLink>
                )}
            </div>
            {role === 'customer' && (
                <div>
                    <MenuLink to="/inq-form/customer">Inquiry 등록</MenuLink>
                </div>
            )}
            {role !== 'customer' && (
                <div>
                    <MenuLink to="/dashboard">대시보드</MenuLink>
                </div>
            )}
        </>
    );

    const VoCMenu = () => (
        <>
            <div>
                <MenuLink to="/voc-list/question">문의 조회</MenuLink>
            </div>
            {role === 'sales' || role === 'quality' ? (
                <div>
                    <MenuLink to="/voc-list/collaboration">협업 조회</MenuLink>
                </div>
            ) : (
                <div>
                    <MenuLink
                        to="/voc-form/question"
                        onClick={() => {
                            if (isFormPage) {
                                window.confirm(
                                    '작성 중인 질문이 삭제됩니다. 정말 새로고침 하시겠습니까?',
                                )
                                    ? window.location.reload()
                                    : '';
                            }
                        }}
                    >
                        문의 등록
                    </MenuLink>
                </div>
            )}
        </>
    );

    useEffect(() => {
        setOpenInfoModal(false);
        setOpenNotifyModal(false);
    }, [location]);

    useEffect(() => {
        setCurPage(location.pathname.substring(1, 4));
    }, [location]);

    // 모달 켜진 상태로 페이지 이동 또는 외부 컴포넌트 클릭 시 창 닫기
    useEffect(() => {
        const clickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpenInfoModal(false);
                setOpenNotifyModal(false);
            }
        };
        window.addEventListener('mouseup', clickOutside);
        return () => window.removeEventListener('mouseup', clickOutside);
    }, []);

    useEffect(() => {
        if (userId && role && name) {
            fetchNotificationsCount();
            return;
        }
        navigate('/');
    }, [userId, role, name]);

    // 뒤로 가기 방지
    useEffect(() => {
        window.history.pushState(null, '', window.location.href);

        const blockPopState = () => {
            window.history.pushState(null, '', window.location.href);
        };

        window.addEventListener('popstate', blockPopState);

        return () => {
            window.removeEventListener('popstate', blockPopState);
        };
    }, []);

    return (
        <>
            <div className={Header_Container}>
                <div>
                    <div>
                        <MenuLink
                            to={didLogin && url}
                            onClick={() => {
                                setCurPage('inq');
                            }}
                        >
                            Inquiry
                        </MenuLink>
                        <MenuLink
                            to={didLogin && 'voc-list/question'}
                            onClick={() => {
                                setCurPage('voc');
                            }}
                        >
                            VoC
                        </MenuLink>
                    </div>
                    <hr />
                    <div>
                        <div>
                            <div>
                                <img
                                    src={pobluesky}
                                    alt="poscodx"
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                />
                            </div>
                            {didLogin &&
                                (curPage === 'inq' || curPage === 'das'
                                    ? InquiryMenu()
                                    : curPage === 'voc'
                                    ? VoCMenu()
                                    : '')}
                        </div>
                        <div>
                            {/* 로그인 & 회원가입 버튼 */}
                            {!didLogin && (isJoinPage || isMainPage) && (
                                <div>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        btnName={'로그인'}
                                        width={'84px'}
                                        height={'36px'}
                                        textColor={'#64636A'}
                                        backgroundColor={'#ffffff'}
                                        border={'solid #d5dbe2 1px'}
                                        borderRadius={'4px'}
                                        fontSize={'18px'}
                                        fontFamily={'Pretendard-Regular'}
                                    />
                                </div>
                            )}
                            {!didLogin && isLoginPage && (
                                <div>
                                    <Button
                                        onClick={() => navigate('/join')}
                                        btnName={'회원가입'}
                                        width={'84px'}
                                        height={'36px'}
                                        textColor={'#64636A'}
                                        backgroundColor={'#ffffff'}
                                        border={'solid #d5dbe2 1px'}
                                        borderRadius={'4px'}
                                        fontSize={'18px'}
                                        fontFamily={'Pretendard-Regular'}
                                    />
                                </div>
                            )}
                            {didLogin && (
                                <>
                                    <div>
                                        <button
                                            ref={infoButtonRef}
                                            onClick={toggleInfoModal}
                                        >
                                            <img src={profile} />
                                        </button>
                                    </div>
                                    <div>{name}</div>
                                    <div>
                                        <button
                                            ref={notificationButtonRef}
                                            onClick={toggleNotifyModal}
                                        >
                                            <Badge
                                                badgeContent={totalElements}
                                                color="primary"
                                            >
                                                <NotificationsNoneIcon color="action" />
                                            </Badge>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {openInfoModal && (
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <UserInfoModal onClose={toggleInfoModal} />
                </div>
            )}
            {openNotifyModal && (
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <NotificationModal
                        onClose={toggleNotifyModal}
                        onUpdateNotificationsCount={fetchNotificationsCount}
                    />
                </div>
            )}
        </>
    );
}

export default MyHeader;
