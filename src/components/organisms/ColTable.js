import React, { useEffect, useState } from 'react';
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

import { Select } from '../../assets/css/Voc.css';
import {
    getAllCollaboration,
    getCollaborationDetail,
} from '../../apis/api/collaboration';
import { useAuth } from '../../hooks/useAuth';
import { getCookie } from '../../apis/utils/cookies';

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
    colId,
    questionId,
    colReqManager,
    colStatus,
    colContents,
    createdDate,
) {
    return {
        colId,
        questionId,
        colReqManager,
        colStatus,
        colContents,
        createdDate,
    };
}

export default function ColTable({
    colNo,
    colManager,
    startDate,
    endDate,
    timeFilter,
    progressFilter,

    setSearchCount,

    setQuestionId,
    setColId,
    setStatus,
    status,
    setAuth,
    setColDetail,
    setHeight,
    setOpenModal,
}) {
    const role = getCookie('userRole');
    const { userId } = useAuth();

    const [filterArgs, setFilterArgs] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [collabs, setCollabs] = useState([]);

    const validStatuses = ['READY', 'COMPLETE', 'INPROGRESS', 'REFUSE'];

    // 해당 협업 관련 담당자 여부 확인
    const isAuthorized = (authorizedId) => {
        if (role === 'quality' && authorizedId !== userId) {
            setAuth(false);
        }
    };

    const fetchGetCol = async (filterArgs) => {
        try {
            const response = await getAllCollaboration(filterArgs);
            setCollabs(response.data);
            setSearchCount(response.data.length);
        } catch (error) {
            console.error('협업 요약 조회 실패: ', error);
        }
    };

    const fetchGetColDetail = async (questionId, colId) => {
        try {
            const response = await getCollaborationDetail(questionId, colId);
            setColDetail(response.data);
            isAuthorized(response.data.colManagerToResponseDto.userId);
            if (response.data && response.data.colStatus === 'READY') {
                setHeight('55vh');
            } else if (response.data && response.data.colStatus !== 'READY') {
                setHeight('85vh');
            }
            setOpenModal(true);
        } catch (error) {
            console.error('협업 상세 조회 실패: ', error);
        }
    };

    useEffect(() => {
        let args = '';
        if (colNo) {
            args += `${args ? '&' : ''}colReqId=${colNo}`;
        }
        if (colManager) {
            args += `${args ? '&' : ''}colReqManager=${colManager}`;
        }
        if (startDate && endDate) {
            const s = `startDate=${
                new Date(startDate).toISOString().split('T')[0]
            }`;
            const e = `endDate=${
                new Date(endDate).toISOString().split('T')[0]
            }`;
            args += `${args ? '&' : ''}${s}&${e}`;
        }
        if (timeFilter == 'LATEST' || timeFilter == 'OLDEST') {
            args += `${args ? '&' : ''}sortBy=${timeFilter}`;
        }
        if (validStatuses.includes(progressFilter)) {
            args += `${args ? '&' : ''}colStatus=${progressFilter}`;
        }
        setFilterArgs(args);
    }, [colNo, colManager, startDate, endDate, timeFilter, progressFilter]);

    useEffect(() => {
        fetchGetCol(filterArgs);
    }, [userId, filterArgs, status]);

    const columns = [
        {
            id: 'colId',
            label: 'No',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'questionId',
            label: '질문 번호',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'colReqManager',
            label: '담당자',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'colStatus',
            label: '진행 상황',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'colContents',
            label: '내용',
            align: 'center',
            width: 240,
            minWidth: 240,
        },
        {
            id: 'createdDate',
            label: '등록 일자',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
    ];

    console.log(collabs);
    const rows = collabs.map((collab) =>
        createData(
            collab.colId,
            collab.questionId,
            collab.colReqManager,
            collab.colStatus,
            collab.colContents,
            collab.createdDate,
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
        <TableContainer
            component={Paper}
            sx={{ width: 1320, margin: '24px auto 10vh auto' }}
        >
            <Table
                size="small"
                // stickyHeader="true"
                aria-label="custom pagination table"
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
                            key={row.colId}
                            className={Select}
                            // sx={{
                            //     '&:last-child td, &:last-child th': {
                            //         border: 0,
                            //     },
                            // }}
                            onClick={() => {
                                setStatus(row.colStatus);
                                setQuestionId(row.questionId);
                                setColId(row.colId);
                                fetchGetColDetail(row.questionId, row.colId);
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.colId}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.questionId}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.colReqManager}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                    fontWeight: 600,
                                    // color:
                                    //     row.colStatus === 'READY'
                                    //         ? '#ffffff'
                                    //         : '#000000',
                                    // backgroundColor:
                                    //     row.colStatus === 'READY'
                                    //         ? '#3c6cf2'
                                    //         : row.colStatus === 'INPROGRESS'
                                    //         ? '#a1c2ff'
                                    //         : row.colStatus === 'REFUSE'
                                    //         ? '#ffdb7b'
                                    //         : '',
                                }}
                            >
                                {row.colStatus === 'READY'
                                    ? '협업 대기'
                                    : row.colStatus === 'INPROGRESS'
                                    ? '협업 진행 중'
                                    : row.colStatus === 'COMPLETE'
                                    ? '협업 완료'
                                    : '협업 거절'}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 240,
                                    minWidth: 240,
                                }}
                            >
                                {row.colContents.replace(/<\/?[^>]+(>|$)/g, "")}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.createdDate.substr(0, 10)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow sx={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
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
                            colSpan={6}
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
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
