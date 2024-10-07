import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const LogContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    maxWidth: '500px',
    margin: 'auto',
    backgroundColor: '#ffffff',
    position: 'relative',
}));

const LogItem = styled(Box)(({ theme, filled }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: filled ? theme.palette.text.primary : theme.palette.text.disabled,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    zIndex: 1,
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));

const ProgressText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: theme.spacing(0.5),
}));

const Timestamp = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    marginTop: theme.spacing(0.5),
}));

const InquiryLogs = ({ inquiryLogs, inquiryType }) => {
    const logs = Array.isArray(inquiryLogs) ? inquiryLogs : [];

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleString('ko-KR', options).replace('오전', 'AM').replace('오후', 'PM');
    };

    const progressLabels = inquiryType === '품질+견적 문의'
        ? [
            "문의제출",
            "문의접수",
            "1차검토완료",
            "품질검토요청",
            "품질검토접수",
            "품질검토완료",
            "최종검토완료"
        ]
        : [
            "문의제출",
            "문의접수",
            "1차검토완료",
            "최종검토완료"
        ];

    return (
        <LogContainer>
            {progressLabels.map((progress, index) => {
                const log = logs.find(log => log.progress === progress) || {};
                const filled = log.timestamp;

                return (
                    <LogItem key={index} filled={filled}>
                        <IconWrapper>
                            {filled ? (
                                <CheckCircleIcon color="primary" />
                            ) : (
                                <RadioButtonUncheckedIcon color="disabled" />
                            )}
                        </IconWrapper>
                        <ContentWrapper>
                            <ProgressText variant="body1">{progress}</ProgressText>
                            <Timestamp variant="body2">{filled ? formatTimestamp(log.timestamp) : '-'}</Timestamp>
                        </ContentWrapper>
                    </LogItem>
                );
            })}
        </LogContainer>
    );
};

export default InquiryLogs;
