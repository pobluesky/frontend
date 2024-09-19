import React, { useEffect, useRef, useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import close from '../../assets/css/icons/close.svg';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
    Question_Inquiry_Modal_Container,
    Question_Inquiry_Modal,
    Select,
} from '../../assets/css/Voc.css';

import { useAuth } from '../../hooks/useAuth';
import { getAllInquiries, getInquiryDetail } from '../../apis/api/inquiry';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(
    inquiryId,
    salesPerson,
    inquiryType,
    productType,
    customerName,
    progress,
    country,
    corporate,
    corporationCode,
    industry,
) {
    return {
        inquiryId,
        salesPerson,
        inquiryType,
        productType,
        customerName,
        progress,
        country,
        corporate,
        corporationCode,
        industry,
    };
}

export default function QuestionInquirySearchModal({
    setInquiryId,
    openModal,
    setOpenModal,
}) {
    const { userId } = useAuth();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [inquiryData, setInquiries] = useState([]);
    const [searchId, setSearchId] = useState('');
    const contentRef = useRef(null);

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setInquiryId(searchId);
        }
    };

    // Inquiry 전체 조회
    const fetchGetInquiry = async () => {
        try {
            const response = await getAllInquiries(userId);
            setInquiries(response.inquiryInfo);
        } catch (error) {
            console.log('Inquiry 전체 조회 실패: ', error);
        }
    };

    // Inquiry 상세 조회
    const fetchGetInquiryDetail = async (inquiryId) => {
        try {
            const response = await getInquiryDetail(userId, inquiryId);
            setInquiries([response.data]);
        } catch (error) {
            console.log('Inquiry 상세 조회 실패: ', error);
            setInquiries([]);
        }
    };

    useEffect(() => {
        fetchGetInquiry();
    }, [userId, openModal]);

    useEffect(() => {
        fetchGetInquiryDetail(searchId);
    }, [searchId]);

    const columns = [
        {
            id: 'inquiryId',
            label: '문의 번호',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'salesPerson',
            label: '판매 계약자',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'inquiryType',
            label: '문의 유형',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'productType',
            label: '제품',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'customerName',
            label: '고객사',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'progress',
            label: '진행 현황',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'country',
            label: '국가',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'corporate',
            label: '판매 상사',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'corporationCode',
            label: '법인 코드',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'industry',
            label: '산업 분류',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
    ];

    const rows = inquiryData.map((inquiry) =>
        createData(
            inquiry.inquiryId,
            inquiry.salesPerson,
            inquiry.inquiryType,
            inquiry.productType,
            inquiry.customerName,
            inquiry.progress,
            inquiry.country,
            inquiry.corporate,
            inquiry.corporationCode,
            inquiry.industry,
        ),
    );

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={Question_Inquiry_Modal_Container}>
            <div className={Question_Inquiry_Modal} ref={contentRef}>
                <div>
                    <div>Inquiry No</div>
                    <div>
                        <Input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            width={'196px'}
                            height={'26px'}
                            padding={'0 8px 0 8px'}
                            border={'solid 1px #c1c1c1'}
                            borderRadius={'8px'}
                            onKeyDown={enterKeyDown}
                        />
                    </div>
                    <div>
                        <Button
                            btnName={'번호 조회'}
                            width={'96px'}
                            height={'28px'}
                            backgroundColor={'#03507d'}
                            textColor={'#ffffff'}
                            border={'none'}
                            borderRadius={'12px'}
                            onClick={() => {
                                setInquiryId(searchId);
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            width={'96px'}
                            height={'28px'}
                            backgroundColor={'transparent'}
                            border={'none'}
                            imgSrc={close}
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        />
                    </div>
                </div>

                <TableContainer
                    component={Paper}
                    sx={{
                        width: 900,
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Table size="medium" aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={{
                                            width: column.width,
                                            minWidth: column.minWidth,
                                            backgroundColor: '#03507d',
                                            color: '#ffffff',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(
                                      page * rowsPerPage,
                                      page * rowsPerPage + rowsPerPage,
                                  )
                                : rows
                            ).map((row) => (
                                <TableRow
                                    key={row.inquiryId}
                                    className={Select}
                                    onClick={() => {
                                        setInquiryId(row.inquiryId);
                                        window.open(
                                            `/inq-list/customer/${row.inquiryId}`,
                                            '_blank',
                                        );
                                        setOpenModal(false);
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.inquiryId}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.salesPerson}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.inquiryType}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {row.productType}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.customerName}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.progress}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.country}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.corporate}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.corporationCode}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.industry}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow sx={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={10} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[
                                        5,
                                        10,
                                        15,
                                        20,
                                        { label: 'All', value: -1 },
                                    ]}
                                    colSpan={10}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={
                                        handleChangeRowsPerPage
                                    }
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
