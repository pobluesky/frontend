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
    Col_Find_Manager_Modal_Container,
    Col_Find_Manager_Modal,
    Select,
} from '../../assets/css/Voc.css';

import { useAuth } from '../../hooks/useAuth';
import { getAllManager, getManagerByUserId } from '../../apis/api/manager';

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

function createData(userId, empNo, department, role, name, email, phone) {
    return {
        userId,
        empNo,
        department,
        role,
        name,
        email,
        phone,
    };
}

export default function ColFindManagerModal({
    // inquiryId,
    // setInquiryId,
    openModal,
    setOpenModal,
    setColResId,
    setColResManagerName,
    setColResManagerDept,
}) {
    const { userId } = useAuth();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [managerInfo, setManagerInfo] = useState([]);
    const [searchId, setSearchId] = useState('');

    const contentRef = useRef(null);

    const enterKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // setInquiryId(searchId);
        }
    };

    // 담당자 전체 조회
    const fetchGetAllManager = async () => {
        try {
            const response = await getAllManager();
            setManagerInfo(response.data);
        } catch (error) {
            console.log('담당자 전체 조회 실패: ', error);
        }
    };

    useEffect(() => {
        fetchGetAllManager();
    }, [userId, openModal]);

    const columns = [
        {
            id: 'userId',
            label: '회원 번호',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'empNo',
            label: '사번',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'department',
            label: '부서',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'role',
            label: '담당',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'name',
            label: '이름',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'email',
            label: '이메일',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'phone',
            label: '전화번호',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
    ];

    const rows = managerInfo.map((manager) =>
        createData(
            manager.userId,
            manager.empNo,
            manager.department,
            manager.role,
            manager.name,
            manager.email,
            manager.phone,
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
        <div className={Col_Find_Manager_Modal_Container}>
            <div className={Col_Find_Manager_Modal} ref={contentRef}>
                <div>
                    <div>담당자 조회</div>
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
                                setColResId(searchId);
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
                    // sx={{
                    //     width: 900,
                    //     margin: '24px auto 0 auto',
                    //     overflowX: 'auto',
                    // }}
                    sx={{
                        width: 900,
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Table
                        size="medium"
                        // stickyHeader="true"
                        aria-label="collapsible table"
                    >
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
                                    key={row.userId}
                                    className={Select}
                                    onClick={() => {
                                        setColResId(row.userId);
                                        setColResManagerName(row.name);
                                        setColResManagerDept(row.department);
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
                                        {row.userId}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.empNo}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.department}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {row.role}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.email}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            textAlign: 'center',
                                            width: 120,
                                            minWidth: 120,
                                        }}
                                    >
                                        {row.phone}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow sx={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={7} />
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
                                    colSpan={7}
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
