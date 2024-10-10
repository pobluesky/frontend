import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    ToggleButtonGroup, Chip, Grid, CircularProgress,
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
import {
    getInquiryDetailByManagers,
    getInquiryLogs,
} from '../../apis/api/inquiry';
import { productTypes } from '../../utils/inquiry';
import InquiryLogs from './InquiryLogs';

const MyInquiryList = () => {
    const { userId, role } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [inquiryType, setInquiryType] = useState('품질+견적 문의');
    const [userInfo, setUserInfo] = useState(null);
    const [commonCount, setCommonCount] = useState(null);
    const [quoteCount, setQuoteCount] = useState(null);
    const [inquiryLineItems, setInquiryLineItems] = useState([]);
    const [productType, setProductType] = useState('');
    const [inquiryLogs, setInquiryLogs] = useState(false);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfo) {
            fetchInquiries();
        }
    }, [inquiryType, userInfo, role]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                fetchInquiryLineItems(),
                fetchInquiryLogs(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, [selectedRow]);

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
                inquiryType:
                    inquiryType === '견적 문의'
                        ? 'QUOTE_INQUIRY'
                        : 'COMMON_INQUIRY',
            };
            const quoteParams = {
                inquiryType: 'QUOTE_INQUIRY',
                salesManagerName: userInfo.name,
            };
            const commonParams = {
                inquiryType: 'COMMON_INQUIRY',
            };

            if (role === 'sales') {
                params.salesManagerName = userInfo.name;
                commonParams.salesManagerName = userInfo.name;
                data = await getSalesManagerInquiriesByParameter(params);

                quoteCount = await getSalesManagerInquiriesByParameter(
                    quoteParams,
                );
                setQuoteCount(quoteCount.length);

                commonCount = await getSalesManagerInquiriesByParameter(
                    commonParams,
                );
                setCommonCount(commonCount.length);
            } else if (role === 'quality') {
                params.qualityManagerName = userInfo.name;
                commonParams.qualityManagerName = userInfo.name;

                data = await getQualityManagerInquiriesByParameter(params);
                commonCount = await getQualityManagerInquiriesByParameter(
                    commonParams,
                );
                setCommonCount(commonCount.length);
            }

            setInquiries(data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await getUserInfoByManagers(userId);
            setUserInfo(response.data.data);
        } catch (error) {
            console.error('Error fetching User Info:', error);
        }
    }

    const fetchInquiryLineItems = async () => {
        const realId = selectedRow ? selectedRow.slice(-2) : '';

        try {
            const response = await getInquiryDetailByManagers(realId);
            setInquiryLineItems(response.data.lineItemResponseDTOs);
        } catch (error) {
            console.error('Error fetching Inquiry Line Items:', error);
        }
    }

    const fetchInquiryLogs = async () => {
        const realId = selectedRow ? selectedRow.slice(-2) : '';
        try {
            const response = await getInquiryLogs(realId);
            setInquiryLogs(response);
            console.log('Inquiry Logs:', response);
        } catch (error) {
            console.error('Error fetching Inquiry Logs:', error);
        }
    };

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
        setProductType(row.productType);
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

    const productTypeMapping = {
        '자동차': 'CAR',
        '열연': 'HOT_ROLLED',
        '냉연': 'COLD_ROLLED',
        '후판': 'THICK_PLATE',
        '선재': 'WIRE_ROD',
    };

    const getColumnLabels = () => {
        const mappedProductType = productTypeMapping[productType] || productType;
        const productTypeFields = productTypes[mappedProductType] || '';
        const labels = {};
        Object.keys(productTypeFields).forEach(key => {
            labels[key] = productTypeFields[key].label || key;
        });
        return labels;
    };

    const columnLabels = getColumnLabels();

    return (
        <Box>
            {role === 'sales' && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1vh', marginRight: '1.4vh' }}>
                    <InquiryTitle sx={{ marginTop: '1vh' }}>내 Inquiry 목록</InquiryTitle>
                    <ToggleButtonGroup
                        value={inquiryType}
                        exclusive
                        onChange={toggleInquiryType}
                        aria-label="문의 유형 선택"
                    >
                        <ToggleButton
                            value="품질+견적 문의"
                            aria-label="품질+견적 문의"
                            sx={{ fontWeight: '600' }}
                        >
                            품질+견적 문의 {commonCount} 건
                        </ToggleButton>
                        <ToggleButton
                            value="견적 문의"
                            aria-label="견적 문의"
                            sx={{ fontWeight: '600' }}
                        >
                            견적 문의 {quoteCount} 건
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            )}
            {role === 'quality' && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1vh', marginRight: '1.4vh' }}>
                    <InquiryTitle sx={{ marginTop: '1vh' }}>내 Inquiry 목록</InquiryTitle>
                    <ToggleButtonGroup
                        value={inquiryType}
                        exclusive
                        aria-label="문의 유형 선택"
                    >
                        <ToggleButton
                            value="품질+견적 문의"
                            aria-label="품질+견적 문의"
                            sx={{ fontWeight: '600' }}
                            disabled
                        >
                            품질+견적 문의 {commonCount} 건
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {/* Inquiry 컨테이너 */}
            <Container sx={{ boxShadow: 2 }}>
                    <MyStepTracker currentStep={currentStep} inquiryType={inquiryType} inquiryLogs={inquiryLogs} />
                    <InquiryTableContainer>
                        <TableContainer component={Paper} elevation={0}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', padding: '0.5rem' }}>
                                            프로필
                                        </TableCell>
                                        <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', padding: '0.5rem' }}>
                                            {role === 'sales' ? "품질 담당자" : "판매 담당자"}
                                        </TableCell>
                                        <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', padding: '0.5rem' }}>
                                            진행 상태
                                        </TableCell>
                                        <TableCell align="left" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', padding: '0.5rem' }}>
                                            판매계약자
                                        </TableCell>
                                        <TableCell align="center" sx={{ backgroundColor: '#edf8ff', border: 'none', fontWeight: '700', width: '15vh', padding: '0.5rem' }}>
                                            진행률
                                        </TableCell>
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
                                            <TableCell align="left" sx={{ padding: '0.5rem' }}>
                                                <ProfileCircle
                                                    name={role === 'sales' ? row.qualityManagerName : row.salesManagerName}
                                                />
                                            </TableCell>
                                            <TableCell align="left" sx={{ padding: '0.5rem' }}>
                                                <InquiryDetails>
                                                    <Typography variant="body1" fontWeight="bold">
                                                        {role === 'sales' ? row.qualityManagerName : row.salesManagerName}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {role === 'sales' ? row.qualityManagerDepartment : row.salesManagerDepartment}
                                                    </Typography>
                                                </InquiryDetails>
                                            </TableCell>
                                            <TableCell align="left" sx={{ padding: '0.5rem' }}>{row.progress}</TableCell>
                                            <TableCell align="left" sx={{ padding: '0.5rem' }}>{row.salesPerson}</TableCell>
                                            <TableCell align="center" sx={{ width: '15vh', padding: '0.5rem' }}>
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
                <Container
                    sx={{
                        boxShadow: 2,
                        width: '20%',
                    }}
                >
                    <InquiryLogs inquiryLogs={inquiryLogs} inquiryType={inquiryType} />
                </Container>
            </Box>

            {/* 라인아이템 컨테이너 */}
            {loading ? (
                <Grid container justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    {selectedRow && (
                        <>
                            <InquiryDetailsContainer>
                                <InquiryTitle>라인아이템 내역</InquiryTitle>
                                <Chip label={productType} color="primary" sx={{ fontSize: '0.9rem', padding: '5px', fontWeight: '700' }} />
                            </InquiryDetailsContainer>
                            <LineItemContainer sx={{ boxShadow: 2 }}>
                                <Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table>
                                            {inquiryLineItems.length > 0 && (
                                                <TableHead style={{ backgroundColor: '#d7eaff' }}>
                                                    <TableRow>
                                                        {Object.keys(inquiryLineItems[0]).map((key) => (
                                                            key !== 'inquiryId' && key !== 'isActivated' && (
                                                                <TableCell
                                                                    key={key}
                                                                    style={{
                                                                        fontWeight: '700',
                                                                        padding: '3px',
                                                                        fontSize: '12px'
                                                                    }}
                                                                    align="center">
                                                                    {columnLabels[key] || key}
                                                                </TableCell>
                                                            )
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                            )}

                                            <TableBody>
                                                {inquiryLineItems.length > 0 ? (
                                                    inquiryLineItems.map((lineItem, lineIndex) => (
                                                        <TableRow key={lineIndex}>
                                                            {Object.entries(lineItem).map(([key, value]) => (
                                                                key !== 'inquiryId' && key !== 'isActivated' && (
                                                                    <TableCell
                                                                        key={key}
                                                                        align="center"
                                                                        sx={{ padding: '3px', fontSize: '12px' }}>
                                                                        {typeof value === 'boolean'
                                                                            ? (value ? 'Yes' : 'No')
                                                                            : value}
                                                                    </TableCell>
                                                                )
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    ''
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </LineItemContainer>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

const Container = styled(Box)`
  background-color: #ffffff;
  border: 0.1vw solid #e0e0e0;
  border-radius: 1vh;
  padding: 1vh;
  overflow: hidden;
  z-index: 0;
  height: 56vh;
  margin: 1.4vh;
  width: 80%;
`;

const LineItemContainer = styled(Box)`
  background-color: #ffffff;
  border: 0.1vw solid #e0e0e0;
  border-radius: 1vh;
  padding: 1vh;
  z-index: 0;
  margin: 1.4vh;
`;

const InquiryDetailsContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '2vh',
});

const InquiryTitle = styled(Typography)({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0 1.5vh 0 1.5vh',
});

const InquiryTableContainer = styled(TableContainer)({
    backgroundColor: '#ffffff',
    maxHeight: '40vh',
    overflowY: 'auto',
    border: '0.1vw solid #e0e0e0',
});

const StyledTableRow = styled(TableRow)(({ selected }) => ({
    cursor: 'pointer',
    boxShadow: selected ? '0 0 0 2px #e1e1e1' : 'none',
    '&:hover': {
        backgroundColor: selected ? '#e5f4ff' : '#f5f5f5',
    },
}));

const InquiryDetails = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default MyInquiryList;