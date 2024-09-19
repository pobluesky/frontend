import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bell from '../../assets/css/icons/bell.svg';
import circle from '../../assets/css/icons/circle.svg';
import readBell from '../../assets/css/icons/readBell.svg';
import readCircle from '../../assets/css/icons/readCircle.svg';
import {
    getNotificationByCustomers,
    getNotificationByManagers,
    getReadNotificationByCustomers,
    getReadNotificationByManagers,
    updateNotificationIsReadByCustomer,
    updateNotificationIsReadByManager,
} from '../../apis/api/notification';
import { useAuth } from '../../hooks/useAuth';
import { Notify_Modal_Container } from '../../assets/css/Header.css';

const NotificationModal = ({ onUpdateNotificationsCount }) => {
    const { role, userId } = useAuth();

    const [activeTab, setActiveTab] = useState('new');
    const [newNotificationList, setNewNotificationList] = useState([]);
    const [readNotificationList, setReadNotificationList] = useState([]);

    const switchTab = (tab) => {
        setActiveTab(tab);
    };

    const fetchNotifications = async () => {
        try {
            if (role === 'customer') {
                const response = await getNotificationByCustomers(userId);
                setNewNotificationList(response.notifications);
            } else if (role === 'quality' || role === 'sales') {
                const response = await getNotificationByManagers(userId);
                setNewNotificationList(response.notifications);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchReadNotifications = async () => {
        try {
            let readNotificationData;
            if (role === 'customer') {
                readNotificationData = await getReadNotificationByCustomers(
                    userId,
                );
            } else if (role === 'quality' || role === 'sales') {
                readNotificationData = await getReadNotificationByManagers(
                    userId,
                );
            }
            setReadNotificationList(readNotificationData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    useEffect(() => {
        if (activeTab === 'read') {
            fetchReadNotifications();
        }
    }, [activeTab, userId]);

    const handleNotificationClick = async (notificationId) => {
        try {
            if (role === 'customer') {
                await updateNotificationIsReadByCustomer(notificationId);
            } else if (role === 'quality' || role === 'sales') {
                await updateNotificationIsReadByManager(notificationId);
            }
            fetchNotifications();
            if (activeTab === 'read') {
                fetchReadNotifications();
            }
            if (onUpdateNotificationsCount) {
                onUpdateNotificationsCount();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={Notify_Modal_Container}>
            <div onClick={(e) => e.stopPropagation()}>
                <div>
                    <TabButton
                        $active={activeTab === 'new'}
                        onClick={() => switchTab('new')}
                    >
                        새 알림
                    </TabButton>
                    <TabButton
                        $active={activeTab === 'read'}
                        onClick={() => switchTab('read')}
                    >
                        읽은 알림
                    </TabButton>
                </div>

                <div>
                    {activeTab === 'new' ? (
                        <div>
                            {newNotificationList.length > 0 ? (
                                newNotificationList.map((notification) => (
                                    <NotificationBox
                                        key={notification.id}
                                        $read={false}
                                    >
                                        <div>
                                            <img
                                                src={bell}
                                                alt="notification"
                                            />
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleNotificationClick(
                                                    notification.id,
                                                )
                                            }
                                        >
                                            {notification.date}
                                            <br />
                                            <span>{notification.contents}</span>
                                        </div>
                                        <div>
                                            <img
                                                src={circle}
                                                alt="notification"
                                            />
                                        </div>
                                    </NotificationBox>
                                ))
                            ) : (
                                <NoNotifications>
                                    새 알림이 없습니다.
                                </NoNotifications>
                            )}
                        </div>
                    ) : (
                        <div>
                            {readNotificationList.length > 0 ? (
                                readNotificationList.map((notification) => (
                                    <NotificationBox
                                        key={notification.id}
                                        $read={true}
                                    >
                                        <div>
                                            <img
                                                src={readBell}
                                                alt="notification"
                                            />
                                        </div>
                                        <div>
                                            {notification.date}
                                            <br />
                                            <span>{notification.contents}</span>
                                        </div>
                                        <div>
                                            <img
                                                src={readCircle}
                                                alt="notification"
                                            />
                                        </div>
                                    </NotificationBox>
                                ))
                            ) : (
                                <NoNotifications>
                                    읽은 알림이 없습니다.
                                </NoNotifications>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;

const TabButton = styled.button`
    padding: 10px;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 16px;
    width: 200px;
    color: ${(props) => (props.$active ? '#03507d' : '#C1C1C1')};
    font-weight: ${(props) => (props.$active ? '800' : '600')};
    border-bottom: ${(props) => (props.$active ? '1px solid #03507d' : 'none')};
`;

const NotificationBox = styled.div`
    padding: 15px;
    margin: 0 0 10px 0;
    border: 1px solid #03507d;
    border-radius: 5px;
    background-color: #f9f9f9;
    text-align: center;
    display: grid;
    grid-template-columns: 0.3fr 5fr 0.3fr;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: background-color 0.3s, border 0.3s;

    span {
        color: #121212;
    }

    &:hover {
        ${({ $read }) =>
            !$read &&
            `
      background-color: #9bccff;
      border: 1px solid #c1c1c1;
      color: #ffffff;
      cursor: pointer;

      span {
        color: #ffffff;
      }
    `}
    }

    ${({ $read }) =>
        $read &&
        `
      background-color: #ffffff;
      border: 1px solid #ababab;
      color: #ababab;

      span {
        color: #ababab;
      }
    `}
`;

const NoNotifications = styled.div`
    text-align: center;
    color: #999;
    font-size: 14px;
    margin: 20px 0 20px 0;
`;
