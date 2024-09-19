import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InquiryMonthlyOrderChart from '../../components/organisms/InquiryMonthlyOrderChart';
import InquiryProgressCountChart from '../../components/organisms/InquiryProgressCountChart';
import InquiryOrderCountChart from '../../components/organisms/InquiryOrderCountChart';
import InquiryProductProgressChart from '../../components/organisms/InquiryProductProgressChart';
import {
    getAverageMonthly,
    getCountsByProgress,
    getPercentageCompletedOrNot,
    getCountByProductType,
} from '../../apis/api/chart';
import { Dashboard_Container } from '../../assets/css/Chart.css';

export default function DashBoard() {
    const [inquiryMonthlyOrder, setInquiryMonthlyOrder] = useState([]);
    const [inquiryProgressCount, setInquiryProgressCount] = useState([]);
    const [inquiryOrderCount, setInquiryOrderCount] = useState([]);
    const [countByProductType, setCountByProductType] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [monthlyOrder, progressCount, orderCount, productType] =
                await Promise.all([
                    getAverageMonthly(), // 월별 Inquiry 접수건 주문 체결 소요일 평균
                    getCountsByProgress(), // 전체 Inquiry 검토 현황별 건수
                    getPercentageCompletedOrNot(), // Inquiry 주문 완료 및 미완료 비중
                    getCountByProductType(), // 전체 제품별 주문 처리 현황
                ]);
            setInquiryMonthlyOrder(monthlyOrder);
            setInquiryProgressCount(progressCount);
            setInquiryOrderCount(orderCount);
            setCountByProductType(productType);
        } catch (error) {
            console.error('대시보드 데이터 조회 실패: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <div className={Dashboard_Container}>
                    <InquiryMonthlyOrderChart data={inquiryMonthlyOrder} />
                    <InquiryProgressCountChart data={inquiryProgressCount} />
                    <InquiryOrderCountChart data={inquiryOrderCount} />
                    <InquiryProductProgressChart data={countByProductType} />
                </div>
            )}
        </>
    );
}
