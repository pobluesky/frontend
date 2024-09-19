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

import { useAuth } from '../../hooks/useAuth';
import { getCookie } from '../../apis/utils/cookies';

import {
    getAllQuestion,
    getQuestionByUserId,
    getQuestionByQuestionId,
    getQuestionByQuestionIdForManager,
} from '../../apis/api/question';
import {
    getAnswerByQuestionId,
    getAnswerByQuestionIdForManager,
} from '../../apis/api/answer';

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
    questionId,
    type,
    customerName,
    title,
    status,
    questionCreatedAt,
    answerCreatedAt,
) {
    return {
        questionId,
        type,
        customerName,
        title,
        status,
        questionCreatedAt,
        answerCreatedAt,
    };
}

export default function QuestionTable({
    // 검색 기능
    title,
    startDate,
    endDate,
    questionNo,
    customerName,
    timeFilter,
    statusFilter,
    typeFilter,

    setSearchCount,

    setQuestionDetail,
    setAnswerDetail,
    setQuestionId,
    setStatus,
    status,
    setOpenModal,
    openModal,
}) {
    const { userId } = useAuth();
    const role = getCookie('userRole');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const [filterArgs, setFilterArgs] = useState('');
    const [questionSummary, setQuestionSummary] = useState([]);

    useEffect(() => {
        let args = '';
        if (title) {
            args += `${args ? '&' : ''}title=${title}`;
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
        if (questionNo) {
            args += `${args ? '&' : ''}questionId=${questionNo}`;
        }
        if (customerName) {
            args += `${args ? '&' : ''}customerName=${customerName}`;
        }
        if (timeFilter) {
            args += `${args ? '&' : ''}sortBy=${timeFilter}`;
        }
        if (statusFilter) {
            args += `${args ? '&' : ''}status=${statusFilter}`;
        }
        if (typeFilter) {
            args += `${args ? '&' : ''}type=${typeFilter}`;
        }
        setFilterArgs(args);
    }, [
        questionNo,
        title,
        startDate,
        endDate,
        questionNo,
        customerName,
        timeFilter,
        statusFilter,
        typeFilter,
    ]);

    // 질문 요약 조회
    const fetchGetQuestions =
        role === 'customer'
            ? async () => {
                  try {
                      const response = await getQuestionByUserId(
                          getCookie('userId'),
                          filterArgs,
                      );
                      setQuestionSummary(response.data);
                      setSearchCount(response.data.length);
                  } catch (error) {
                      console.log('고객사 질문 요약 조회 실패: ', error);
                  }
              }
            : async () => {
                  try {
                      const response = await getAllQuestion(filterArgs);
                      setQuestionSummary(response.data);
                      setSearchCount(response.data.length);
                  } catch (error) {
                      console.log('담당자 질문 요약 조회 실패: ', error);
                  }
              };

    // 질문 상세 조회 (모달로 전달)
    const fetchGetQuestionDetail =
        role === 'customer'
            ? async (questionId, status) => {
                  try {
                      const response = await getQuestionByQuestionId(
                          userId,
                          questionId,
                      );
                      setQuestionDetail(response.data); // 질문 상세 내용 저장
                      if (status === 'COMPLETED') {
                          // 답변 완료 질문인 경우
                          fetchGetAnswerDetail(questionId); // 답변 상세 조회 API 호출
                      } else {
                          // 답변 대기 질문인 경우
                          setAnswerDetail([]); // 답변 Empty Array 전달
                          setOpenModal(true); // 모달 열기
                      }
                  } catch (error) {
                      console.log('고객사 질문 상세 조회 실패: ', error);
                  }
              }
            : async (questionId, status) => {
                  try {
                      const response = await getQuestionByQuestionIdForManager(
                          questionId,
                      );
                      setQuestionDetail(response.data); // 질문 상세 내용 저장
                      if (status === 'COMPLETED') {
                          // 답변 완료 질문인 경우
                          fetchGetAnswerDetail(questionId); // 답변 상세 조회 API 호출
                      } else {
                          // 답변 대기 질문인 경우
                          setAnswerDetail([]); // 답변 Empty Array 전달
                          setOpenModal(true); // 모달 열기
                      }
                  } catch (error) {
                      console.log('담당자 질문 상세 조회 실패: ', error);
                  }
              };

    // 답변 상세 조회 (모달로 전달)
    const fetchGetAnswerDetail =
        role === 'customer'
            ? async (questionId) => {
                  try {
                      const response = await getAnswerByQuestionId(
                          userId,
                          questionId,
                      );
                      setAnswerDetail(response.data); // 답변 상세 내용 저장
                      setOpenModal(true); // 모달 열기
                  } catch (error) {
                      console.log('고객사 답변 상세 조회 실패: ', error);
                  }
              }
            : async (questionId) => {
                  try {
                      const response = await getAnswerByQuestionIdForManager(
                          questionId,
                      );
                      setAnswerDetail(response.data); // 답변 상세 내용 저장
                      setOpenModal(true); // 모달 열기
                  } catch (error) {
                      console.log('담당자 답변 상세 조회 실패: ', error);
                  }
              };

    useEffect(() => {
        fetchGetQuestions();
    }, [userId, filterArgs, openModal]);

    const columns = [
        {
            id: 'questionId',
            label: '질문 번호',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'type',
            label: '질문 유형',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'customerName',
            label: '고객사명',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'title',
            label: '질문 제목',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'status',
            label: '질문 현황',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'questionCreatedAt',
            label: '질문 작성 날짜',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
        {
            id: 'answerCreatedAt',
            label: '답변 작성 날짜',
            align: 'center',
            width: 120,
            minWidth: 120,
        },
    ];

    const rows = questionSummary.map((question) =>
        createData(
            question.questionId,
            question.type,
            question.customerName,
            question.title,
            question.status,
            question.questionCreatedAt,
            question.answerCreatedAt,
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
                            key={row.questionId}
                            className={Select}
                            // 마지막 줄 border 제거
                            // sx={{
                            //     '&:last-child td, &:last-child th': {
                            //         border: 0,
                            //     },
                            // }}
                            onClick={() => {
                                setStatus(row.status);
                                setQuestionId(row.questionId);
                                fetchGetQuestionDetail(
                                    row.questionId,
                                    row.status,
                                );
                            }}
                        >
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
                                {row.type === 'INQ'
                                    ? 'Inquiry'
                                    : row.type === 'SITE'
                                    ? '사이트 문의'
                                    : '기타 문의'}
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
                                    fontWeight: 600,
                                }}
                            >
                                {row.title}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.status === 'READY'
                                    ? '답변 대기'
                                    : '답변 완료'}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.questionCreatedAt.substring(0, 10)}
                            </TableCell>{' '}
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    width: 120,
                                    minWidth: 120,
                                }}
                            >
                                {row.answerCreatedAt &&
                                    row.answerCreatedAt.substring(0, 10)}
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
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
