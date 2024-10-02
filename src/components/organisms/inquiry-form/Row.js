import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useRef,
} from 'react';
import {
    TableRow,
    TableCell,
    Checkbox,
    Popover,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    getInquiryDetailByManagers,
    putManagerAllocate,
} from '../../../apis/api/inquiry';
import { _Table } from '../../../assets/css/Inquiry.css';
import { BorderLinearProgress } from '../../molecules/BorderLinearProgress';
import InquiryTypeBadge from '../../atoms/Chip';
import StepTracker from '../../molecules/StepTracker';
import {
    postNotificationByCustomers,
    postNotificationByManagers,
} from '../../../apis/api/notification';
import { styled } from '@mui/material/styles';

function Row({ row, role }, ref) {
    const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
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
            setPercentage(25);
        } else if (row.progress === '1차검토완료') {
            setPercentage(40);
            if (row.inquiryType === '견적 문의') {
                setPercentage(60);
            }
        } else if (row.progress === '품질검토요청') {
            setPercentage(50);
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
                return 1;
        }
    };

    const currentStep = calculateStep();

    const handleClick = () => {
        navigate(`/inq-list/${role}/${row.processedInquiryId}`);
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
    };

    const handleSubmit = async () => {
        try {
            if (isChecked && !isDisabled) {
                const response = await putManagerAllocate(row.processedInquiryId);
                setIsDisabled(true);

                const inquiryInfo = await getInquiryDetailByManagers(row.processedInquiryId);
                if (role === 'sales') {
                    await postNotificationByCustomers(
                        inquiryInfo.data.customerId, {
                            notificationContents: `${inquiryInfo.data.name}님의 Inquiry ${row.processedInquiryId}번 담당자가 배정되었습니다.`,
                        })
                } else if (role === 'quality') {
                    await postNotificationByManagers(inquiryInfo.data.salesManagerSummaryDto.userId, {
                        notificationContents:
                            `Inquiry ${row.processedInquiryId}번 문의의 품질 담당자가 배정되었습니다.`,
                    })
                } else {
                }
            }
        } catch (error) {
            console.log('Error putting Manager Allocation:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    useEffect(() => {
        if (role === 'sales') {
            setIsDisabled(row.salesManagerName !== '-');
            setIsChecked(row.salesManagerName !== '-');
        } else if (role === 'quality') {
            setIsDisabled(row.qualityManagerName !== '-');
            setIsChecked(row.qualityManagerName!== '-');
        } else {
            setIsDisabled(false);
        }
    }, [row.salesManagerName, row.qualityManagerName]);

    return (
        <React.Fragment>
            <TableRow
                className={_Table}
                sx={{ '& > *': { borderBottom: 'unset' } }}
                style={{ cursor: 'pointer', border: '0.05em solid #c1c1c1' }}
                onClick={handleClick}
            >
                <TableCell className="custom-table-cell" align="left" sx={{ width: '80px', paddingLeft: '40px' }}>{row.processedInquiryId}</TableCell>
                <TableCell className="custom-table-cell" align="center">
                    <InquiryTypeBadge inquiryType={row.inquiryType} />
                </TableCell>
                <TableCell className="custom-table-cell" align="left">{row.salesPerson}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.productType}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.customerName}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.country}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporate}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.corporationCode}</TableCell>
                <TableCell className="custom-table-cell" align="left">{row.industry}</TableCell>
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
                <TableCell className="custom-table-cell" align="left">
                    <InquiryDetails>
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '14px' }}>
                            {row.qualityManagerName}
                        </Typography>
                        <Typography variant="body3" color="text.secondary" fontWeight="thin" sx={{ fontSize: '12px' }}>
                            {row.qualityManagerDepartment}
                        </Typography>
                    </InquiryDetails>
                </TableCell>                <TableCell className="custom-table-cell" align="center">{row.createdDate}</TableCell>
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

const ForwardedRow = forwardRef(Row);

const InquiryDetails = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default ForwardedRow;
