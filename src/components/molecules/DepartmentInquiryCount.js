import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const DepartmentInquiryCount = ({ departmentName, inquiryCount, changeRate, previousCount, inquiryDifference }) => {
    const isIncrease = inquiryDifference > 0;
    const isNoChange = inquiryDifference === 0;

    const changeRateFormatted = changeRate === 0.0 && previousCount === 0
        ? '+0.0%'
        : `${isIncrease ? '+' : ''}${changeRate.toFixed(1)}%`;

    const changeDescription = isNoChange
        ? '전월대비 변화 없음'
        : `전월대비 ${Math.abs(previousCount)}건 ${isIncrease ? '증가' : '감소'}`;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 2.7,
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                boxShadow: 2,
                marginBottom: 2,
                height: '75px',
            }}
        >
            <Typography sx={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>
                {departmentName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                <Typography variant="h7" sx={{ fontWeight: 'bold', color: '#007bff' }}>
                    {inquiryCount}
                </Typography>
                <Typography variant="h8" sx={{ margin: '0 15px', color: '#555' }}>
                    {changeRateFormatted}
                </Typography>
                {isNoChange ? (
                    <HorizontalRuleIcon sx={{ color: '#888', fontSize: '20px' }} />
                ) : isIncrease ? (
                    <ArrowUpwardIcon sx={{ color: '#4caf50' }} />
                ) : (
                    <ArrowDownwardIcon sx={{ color: '#f44336' }} />
                )}
            </Box>
            <Typography sx={{ color: '#777', marginTop: 1, fontSize: '13px' }}>
                {changeDescription}
            </Typography>
        </Box>
    );
};

export default DepartmentInquiryCount;
