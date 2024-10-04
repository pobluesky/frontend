import React, { useState, useEffect } from 'react';
import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import DepartmentByMonth from '../../components/organisms/DepartmentByMonth';
import MyInquiryList from '../../components/molecules/MyInquiryList';
import { InquiryOrderCountTotalChart } from '../../components/organisms/InquiryOrderCountTotalChart';
import { InquiryOrderCountManagerChart } from '../../components/organisms/InquiryOrderCountManagerChart';
import { InquiryProgressCountTotalChart } from '../../components/organisms/InquiryProgressCountTotalChart';
import { InquiryProgressCountManagerChart } from '../../components/organisms/InquiryProgressCountManagerChart';
import { InquiryOrderPeriodChart } from '../../components/organisms/InquiryOrderPeriodChart';
import { InquiryProductProgressChart } from '../../components/organisms/InquiryProductProgressChart';
import {
    getAverageMonthly,
    getCountsByProgress,
    getPercentageCompletedOrNot,
    getCountByProductType,
    getCountsOfAnswers,
    getCountsOfCol,
} from '../../apis/api/chart';
import profile from '../../assets/css/icons/profile.svg';
import { useAuth } from '../../hooks/useAuth';
import { getCookie } from '../../apis/utils/cookies';

export default function DashBoard() {
    const { userId } = useAuth();
    const name = getCookie('userName');

    const [isLoading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Dashboard');

    const [orderPeriod, setOrderPeriod] = useState([]);
    const [progressCount, setProgressCount] = useState([]);
    const [orderCount, setOrderCount] = useState([]);
    const [productType, setProductType] = useState([]);
    const [answerCount, setAnswerCount] = useState([]);
    const [colCount, setColCount] = useState([]);

    const fetchData = async () => {
        try {
            const [a, b, c, d, e, f] = await Promise.all([
                getAverageMonthly(),
                getCountsByProgress(),
                getPercentageCompletedOrNot(),
                getCountByProductType(),
                getCountsOfAnswers(),
                getCountsOfCol(),
            ]);
            setOrderPeriod(a);
            setProgressCount(b);
            setOrderCount(c);
            setProductType(d);
            setAnswerCount(e);
            setColCount(f);
        } catch (error) {
            console.error('대시보드 데이터 조회 실패: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const renderContent = () => {
        if (activeTab === 'Dashboard') {
            return (
                <>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                            width={'100%'}
                            height={'85vh'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <DepartmentByMonth />
                            <MyInquiryList />
                            <InquiryOrderCountTotalChart
                                orderCount={orderCount}
                                name={name}
                            />

                            <InquiryOrderCountManagerChart
                                orderCount={orderCount}
                                name={name}
                            />
                            <InquiryOrderPeriodChart
                                orderPeriod={orderPeriod}
                                name={name}
                            />
                            <InquiryProgressCountTotalChart
                                progressCount={progressCount}
                                name={name}
                            />
                            <InquiryProgressCountManagerChart
                                progressCount={progressCount}
                                name={name}
                            />
                            <InquiryProductProgressChart
                                data={productType}
                                name={name}
                            />
                        </>
                    )}
                </>
            );
        } else if (activeTab === 'Inquiry Log') {
            return <div>Inquiry Log 페이지</div>;
        } else if (activeTab === 'User Info') {
            return <div>User Info 페이지</div>;
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    width: '18vw',
                    backgroundColor: '#2A3F54',
                    color: '#fff',
                    padding: '2vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2vh',
                    }}
                >
                    <Avatar
                        alt={'profile'}
                        src={profile}
                        sx={{
                            width: '9vw',
                            height: '9vw',
                            marginBottom: '0.8vh',
                            marginTop: '4vh',
                        }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: '700' }}>
                        {name}
                    </Typography>
                </Box>
                <List>
                    {[
                        { text: 'Dashboard', icon: <DashboardIcon /> },
                        { text: 'Inquiry Log', icon: <ReceiptIcon /> },
                        { text: 'User Info', icon: <PersonIcon /> },
                    ].map(({ text, icon }) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => handleTabChange(text)}
                            sx={{
                                textAlign: 'center',
                                '&:hover': { backgroundColor: '#1A2837' },
                                backgroundColor:
                                    activeTab === text
                                        ? '#1A2837'
                                        : 'transparent',
                            }}
                        >
                            {icon} {/* 아이콘 추가 */}
                            <ListItemText
                                primary={text}
                                sx={{ marginLeft: '8px' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#F4F5FB',
                    height: '100%',
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
}
