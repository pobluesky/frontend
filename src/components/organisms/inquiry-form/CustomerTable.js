import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { _Table } from '../../../assets/css/Inquiry.css';
import { BorderLinearProgress } from '../../molecules/BorderLinearProgress';
import InquiryTypeBadge from '../../atoms/Chip';
import { Popover, Typography } from '@mui/material';
import StepTracker from '../../molecules/StepTracker';
import { styled } from '@mui/material/styles';

function Row({ row, role }) {
    const [percentage, setPercentage] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverRef = useRef(null);

    const navigate = useNavigate();


    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const calculatePercentage = () => {
        if (row.progress === '문의제출') {
            setPercentage(10);
        } else if (row.progress === '문의접수') {
            setPercentage(20);
        } else if (row.progress === '1차검토완료') {
            setPercentage(35);
            if (row.inquiryType === '견적 문의') {
                setPercentage(60);
            }
        } else if (row.progress === '품질검토요청') {
            setPercentage(45);
        } else if (row.progress === '품질검토접수') {
            setPercentage(65);
        } else if (row.progress === '품질검토완료') {
            setPercentage(80);
        } else if (row.progress === '최종검토완료') {
            setPercentage(100);
        }
    }

    useEffect(() => {
        calculatePercentage();
    }, [row.progress]);

    const calculateStep = () => {
        switch (row.progress) {
            case '문의제출':
                return 1;
            case '문의접수':
                return 2;
            case '1차검토완료':
                return row.inquiryType === '견적 문의' ? 4 : 3;
            case '품질검토요청':
                return 4;
            case '품질검토접수':
                return 5;
            case '품질검토완료':
                return 6;
            case '최종검토완료':
                return 7;
            default:
                return 1;
        }
    };

    const currentStep = calculateStep();

    const handleClick = () => {
        navigate(`/inq-list/${role}/${row.processedInquiryId}`);
    };

    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'unset' }}}
                onClick={handleClick}
                style={{ cursor: 'pointer', border: '0.05em solid #c1c1c1' }}
                className={_Table}
            >
                <TableCell
                        component="th"
                        scope="row"
                        className="custom-table-cell"
                        sx={{ paddingLeft: '50px', width: '50px' }}
                        align="left">
                    {row.processedInquiryId}
                </TableCell>
                <TableCell className="custom-table-cell" align="center">
                    <InquiryTypeBadge inquiryType={row.inquiryType} />
                </TableCell>
                <TableCell className="custom-table-cell" align="left">{row.salesPerson}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.productType}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.customerName}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.country}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporate}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporationCode}</TableCell>
                <TableCell className="custom-table-cell" align="center">{row.industry}</TableCell>
                <TableCell className="custom-table-cell" align="left">
                    <InquiryDetails>
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '14px' }}>
                            {row.salesManagerName}
                        </Typography>
                        <Typography variant="body3" color="text.secondary" fontWeight="thin" sx={{ fontSize: '12px' }}>
                            {row.salesManagerDepartment}
                        </Typography>
                    </InquiryDetails>
                </TableCell>
                <TableCell className="custom-table-cell" align="center">{row.createdDate}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.progress}</TableCell>
                <TableCell
                    className="custom-table-cell"
                    align="left"
                    sx={{ width: '120px' }}
                    ref={popoverRef}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    <BorderLinearProgress variant="determinate" value={percentage} />
                </TableCell>
            </TableRow>
            <Popover
                id="progress-popover"
                sx={{ pointerEvents: 'none', width: '570px', height: '100%' }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <StepTracker currentStep={currentStep} inquiryType={row.inquiryType} />
            </Popover>
        </React.Fragment>
    );
}

const InquiryDetails = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function CollapsibleTable({
    rows,
    currentPage,
    rowsPerPage,
    totalRows,
    handlePageChange,
    handleRowsPerPageChange,
    role
}) {
    return (
        <Paper>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '10px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#03507d' }}>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff', paddingLeft: '70px', fontWeight: '700' }}>Inquiry No.</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>문의유형</TableCell>
                            <TableCell className="custom-table-cell" sx={{ color: '#ffffff', fontWeight: '700' }}>판매계약자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>제품</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>고객사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>국가</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>판매상사</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>법인코드</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>산업분류</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>담당자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>문의일자</TableCell>
                            <TableCell className="custom-table-cell" align="left" sx={{ color: '#ffffff', fontWeight: '700' }}>진행현황</TableCell>
                            <TableCell className="custom-table-cell" align="center" sx={{ color: '#ffffff', fontWeight: '700' }}>Inquiry 진행률</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.processedInquiryId} row={row} role={role} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalRows}
                page={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                labelRowsPerPage="Rows per page:"
                rowsPerPageOptions={[10, 15, 25]}
            />
        </Paper>
    );
}
