import React, { useState, useEffect } from 'react';
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
import {
    Grid,
    Pagination,
    Tabs,
    Tab,
    Card,
    CardContent,
    Typography,
    Badge,
    IconButton,
    CircularProgress,
} from '@mui/material';

const NotificationModal = ({ onUpdateNotificationsCount }) => {
    const { role, userId } = useAuth();
    const [activeTab, setActiveTab] = useState('new');
    const [newNotificationList, setNewNotificationList] = useState([]);
    const [readNotificationList, setReadNotificationList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationsPerPage] = useState(6);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    const switchTab = (event, newValue) => {
        setActiveTab(newValue);
        setCurrentPage(1);
    };

    const fetchNotifications = async () => {
        setLoading(true); // 로딩 시작
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
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const fetchReadNotifications = async () => {
        setLoading(true); // 로딩 시작
        try {
            let readNotificationData;
            if (role === 'customer') {
                readNotificationData = await getReadNotificationByCustomers(userId);
            } else if (role === 'quality' || role === 'sales') {
                readNotificationData = await getReadNotificationByManagers(userId);
            }
            setReadNotificationList(readNotificationData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

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

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    useEffect(() => {
        if (activeTab === 'read') {
            fetchReadNotifications();
        }
    }, [activeTab, userId]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = newNotificationList.slice(indexOfFirstNotification, indexOfLastNotification);

    return (
        <div className={Notify_Modal_Container}>
            <div onClick={(e) => e.stopPropagation()}>
                <Tabs
                    value={activeTab}
                    onChange={switchTab}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    sx={{ width: '100%' }}
                >
                    <Tab label="새 알림" value="new" sx={{ flex: 1 }} />
                    <Tab label="읽은 알림" value="read" sx={{ flex: 1 }} />
                </Tabs>

                <div>
                    {loading ? ( // 로딩 상태에 따라 로딩 스피너 표시
                        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                            <CircularProgress />
                        </Grid>
                    ) : activeTab === 'new' ? (
                        <div>
                            {newNotificationList.length > 0 ? (
                                currentNotifications.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        sx={{
                                            marginBottom: 1,
                                            cursor: 'pointer',
                                            border: '1px solid #03507d',
                                            borderRadius: '5px',
                                            fontSize: '12px',
                                            transition: 'background-color 0.3s, border 0.3s',
                                            '&:hover': {
                                                backgroundColor: '#f4f5ff',
                                            },
                                        }}
                                        onClick={() => handleNotificationClick(notification.id)}
                                    >
                                        <CardContent>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Badge badgeContent="" color="error" variant="dot">
                                                        <img src={bell} alt="notification" />
                                                    </Badge>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography variant="body2" fontWeight="700">
                                                        {notification.date}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {notification.contents}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <img src={circle} alt="circle" />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary" align="center">
                                    새 알림이 없습니다.
                                </Typography>
                            )}
                            <Pagination
                                count={Math.ceil(newNotificationList.length / notificationsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', fontSize: '11px' }}
                            />
                        </div>
                    ) : (
                        <div>
                            {readNotificationList.length > 0 ? (
                                readNotificationList.map((notification) => (
                                    <Card
                                        key={notification.id}
                                        sx={{ marginBottom: 1, backgroundColor: '#f0f0f0', fontSize: '12px' }}
                                    >
                                        <CardContent>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <img src={readBell} alt="read notification" />
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography variant="body2" fontWeight="700">
                                                        {notification.date}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {notification.contents}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <img src={readCircle} alt="read circle" />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary" align="center">
                                    읽은 알림이 없습니다.
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationModal;
