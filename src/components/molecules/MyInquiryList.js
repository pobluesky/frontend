import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MyStepTracker from './MyStepTracker';
import ProfileCircle from '../atoms/ProfileCircle';
import {
    getQualityManagerInquiriesByParameter,
    getSalesManagerInquiriesByParameter,
} from '../../apis/api/inquirySearch';
import { BorderLinearProgress } from './BorderLinearProgress';
import { getUserInfoByManagers } from '../../apis/api/auth';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const MyInquiryList = () => {
    const { userId, role } = useAuth();
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [inquiryType, setInquiryType] = useState('품질+견적 문의');
    const [userInfo, setUserInfo] = useState(null);
    const [commonCount, setCommonCount] = useState(null);
    const [quoteCount, setQuoteCount] = useState(null);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchInquiries();
        }
    }, [inquiryType, userInfo, role]);

    useEffect(() => {
        if (inquiries.length > 0) {
            const initialRow = inquiries[0];
            updateStepTracker(initialRow);
        }
    }, [inquiries]);

    const fetchInquiries = async () => {
        if (!userInfo) return;
        try {
            let data, quoteCount, commonCount;

            const params = {
                inquiryType: inquiryType === '견적 문의' ? 'QUOTE_INQUIRY' : 'COMMON_INQUIRY',
            };
            const quoteParams = {
                inquiryType: 'QUOTE_INQUIRY',
                salesManagerName: userInfo.name,
            }
            const commonParams = {
                inquiryType: 'COMMON_INQUIRY',
            }

            if (role === 'sales') {
                params.salesManagerName = userInfo.name;
                commonParams.salesManagerName = userInfo.name;
                data = await getSalesManagerInquiriesByParameter(params);

                quoteCount = await getSalesManagerInquiriesByParameter(quoteParams);
                setQuoteCount(quoteCount.length);

                commonCount = await getSalesManagerInquiriesByParameter(commonParams);
                setCommonCount(commonCount.length);
            } else if (role === 'quality') {
                params.qualityManagerName = userInfo.name;
                commonParams.qualityManagerName = userInfo.name;

                data = await getQualityManagerInquiriesByParameter(params);
                commonCount = await getQualityManagerInquiriesByParameter(commonParams);
                setCommonCount(commonCount.length);
            }

            setInquiries(data);

        } catch (error) {
            console.error('Error fetching inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await getUserInfoByManagers(userId);
            setUserInfo(response.data.data);
        } catch (error) {
            console.error('Error fetching User Info:', error);
        } finally {
            setLoading(false);
        }
    }

    const updateStepTracker = (row) => {
        const step = calculateStep(row.progress);
        setCurrentStep(step);
        setInquiryType(row.inquiryType);
    };

    const calculateStep = (progress) => {
        switch (progress) {
            case '문의제출':
                return 1;
            case '문의접수':
                return 2;
            case '1차검토완료':
                return 3;
            case '품질검토요청':
                return 4;
            case '품질검토접수':
                return 5;
            case '품질검토완료':
                return 6;
            case '최종검토완료':
                return 7;
            default:
                return 0;
        }
    };

    const calculatePercentage = (progress, inquiryType) => {
        let percentage = 0;

        if (progress === '문의제출') {
            percentage = 10;
        } else if (progress === '문의접수') {
            percentage = 20;
        } else if (progress === '1차검토완료') {
            percentage = 35;
            if (inquiryType === '견적 문의') {
                percentage = 60;
            }
        } else if (progress === '품질검토요청') {
            percentage = 45;
        } else if (progress === '품질검토접수') {
            percentage = 65;
        } else if (progress === '품질검토완료') {
            percentage = 80;
        } else if (progress === '최종검토완료') {
            percentage = 100;
        }
        return percentage;
    };

    const handleRowClick = (row) => {
        setSelectedRow(row.processedInquiryId);
        updateStepTracker(row);
        navigate(`/inq-list/${role}/${row.processedInquiryId}`);
    };

    const handleRowMouseEnter = (row) => {
        const step = calculateStep(row.progress);
        setCurrentStep(step);
    };

    const handleRowMouseLeave = () => {
        if (inquiries.length > 0) {
            const initialRow = inquiries[0];
            updateStepTracker(initialRow);
        }
    };

    const toggleInquiryType = (event, newType) => {
        if (newType !== null) {
            setInquiryType(newType);
        }
    };

    return (
        <Box>
            {role === 'sales' && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1vh', marginRight: '1.4vh' }}>
                    <ToggleButtonGroup
                        value={inquiryType}
                        exclusive
                        onChange={toggleInquiryType}
                        aria-label="문의 유형 선택"
                    >
                        <ToggleButton value="품질+견적 문의" aria-label="품질+견적 문의" sx={{ fontWeight: '600' }}>
                            품질+견적 문의 {commonCount} 건
                        </ToggleButton>
                        <ToggleButton value="견적 문의" aria-label="견적 문의" sx={{ fontWeight: '600' }}>
                            견적 문의 {quoteCount} 건
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            )}
            {role === 'quality' && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1vh', marginRight: '1.4vh' }}>
                    <ToggleButtonGroup
                        value={inquiryType}
                        exclusive
                        aria-label="문의 유형 선택"
                    >
                        <ToggleButton value="품질+견적 문의" aria-label="품질+견적 문의" sx={{ fontWeight: '600' }} disabled>
                            품질+견적 문의 {commonCount} 건
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            )}
        <Container sx={{ boxShadow: 2 }}>
            <MyStepTracker currentStep={currentStep} inquiryType={inquiryType} />
            <InquiryTableContainer>
                <TableContainer component={Paper} elevation={0}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '3vh' }}>프로필</TableCell>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '6vh' }}>
                                    {role === 'sales' ? "품질 담당자" : "판매 담당자"}
                                </TableCell>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '6vh' }}>진행 상태</TableCell>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '6vh' }}>문의 일자</TableCell>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '6vh' }}>고객</TableCell>
                                <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '6vh' }}>판매계약자</TableCell>
                                <TableCell align="center" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '8vh' }}>진행률</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inquiries.map((row) => (
                                <StyledTableRow
                                    key={row.processedInquiryId}
                                    selected={selectedRow === row.processedInquiryId}
                                    onClick={() => handleRowClick(row)}
                                    onMouseEnter={() => handleRowMouseEnter(row)}
                                    onMouseLeave={handleRowMouseLeave}
                                >
                                    <TableCell align="left" sx={{ width: '3vh' }}>
                                        <ProfileCircle
                                            name={role === 'sales' ? row.qualityManagerName : row.salesManagerName}
                                        />
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '6vh' }}>
                                        <InquiryDetails>
                                            <Typography variant="body1" fontWeight="bold">
                                                {role === 'sales' ? row.qualityManagerName : row.salesManagerName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {role === 'sales' ? row.qualityManagerDepartment : row.salesManagerDepartment}
                                            </Typography>
                                        </InquiryDetails>
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '6vh' }}>{row.progress}</TableCell>
                                    <TableCell align="left" sx={{ width: '6vh' }}>{row.createdDate}</TableCell>
                                    <TableCell align="left" sx={{ width: '6vh' }}>{row.customerName}</TableCell>
                                    <TableCell align="left" sx={{ width: '6vh' }}>{row.salesPerson}</TableCell>
                                    <TableCell align="center" sx={{ width: '8vh' }}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={calculatePercentage(row.progress, inquiryType)}
                                        />
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InquiryTableContainer>
        </Container>
        </Box>
    );
};

const Container = styled(Box)`
  background-color: #ffffff;
  border: 0.1vw solid #e0e0e0;
  border-radius: 1vh;
  padding: 2vh;
  overflow: hidden;
  height: 55vh;
  z-index: 0;
  margin: 1.4vh;
`;

const InquiryTableContainer = styled(TableContainer)({
    maxHeight: '40vh',
    overflowY: 'auto',
    border: '0.1vw solid #e0e0e0',
});

const StyledTableRow = styled(TableRow)(({ selected }) => ({
    cursor: 'pointer',
    backgroundColor: selected ? '#d2faff' : 'inherit',
    border: selected ? '0.2vh solid #1990ff' : 'none',
    '&:hover': {
        backgroundColor: '#eeeeee',
    },
}));

const InquiryDetails = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default MyInquiryList;
