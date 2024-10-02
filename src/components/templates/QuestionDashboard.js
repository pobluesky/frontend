import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { VocButton } from '../atoms/VocButton';
import QuestionOverview from '../organisms/VocOverview';
import QuestionFilterInput from '../organisms/QuestionFilterInput';
import QuestionList from '../organisms/QuestionList';
import { getAllQuestion, getQuestionByUserId } from '../../apis/api/question';
import { getAllAnswer, getAnswerByUserId } from '../../apis/api/answer';
import { getAllCollaboration } from '../../apis/api/collaboration';
import { getCookie } from '../../apis/utils/cookies';
import { Voc_Dashboard } from '../../assets/css/Voc.css';

export default function QuestionDashboard() {
    const navigate = useNavigate();

    const userId = getCookie('userId');
    const role = getCookie('userRole');

    const [questionCount, setQuestionCount] = useState(0);
    const [answerCount, setAnswerCount] = useState(0);
    const [colCount, setColCount] = useState(0);
    const [searchCount, setSearchCount] = useState(0);

    const [filterArgs, setFilterArgs] = useState('');
    const [questionSummary, setQuestionSummary] = useState([]);

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [questionNo, setQuestionNo] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [timeFilter, setTimeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');

    const [isViewLoading, setViewLoading] = useState(true);
    const [isListLoading, setListLoading] = useState(true);

    const fetchGetQuestionCount =
        role === 'customer'
            ? async () => {
                  try {
                      const response = await getQuestionByUserId(userId, 0, '');
                      setQuestionCount(response.data.totalElements);
                  } catch (error) {
                      console.log('고객사 질문 개수 조회 실패: ', error);
                  }
              }
            : async () => {
                  try {
                      const response = await getAllQuestion(0, '');
                      setQuestionCount(response.data.totalElements);
                  } catch (error) {
                      console.log('담당자 질문 개수 조회 실패: ', error);
                  }
              };

    const fetchGetAnswerCount =
        role === 'customer'
            ? async () => {
                  try {
                      const response = await getAnswerByUserId(userId, '');
                      setAnswerCount(response.data.length);
                  } catch (error) {
                      console.log('고객사 답변 개수 조회 실패: ', error);
                  } finally {
                      setViewLoading(false);
                  }
              }
            : async () => {
                  try {
                      const response = await getAllAnswer();
                      setAnswerCount(response.data.length);
                  } catch (error) {
                      console.log('담당자 답변 개수 조회 실패: ', error);
                  } finally {
                      setViewLoading(false);
                  }
              };

    const fetchGetColCount = async () => {
        try {
            const response = await getAllCollaboration('');
            setColCount(response.data.totalElements);
        } catch (error) {
            console.log('협업 목록 개수 조회 실패: ', error);
        }
    };

    const fetchGetQuestions =
        role === 'customer'
            ? async () => {
                  try {
                      const response = await getQuestionByUserId(
                          userId,
                          currentPage - 1,
                          filterArgs,
                      );
                      setQuestionSummary(response.data.questionsInfo);
                      setTotalPages(response.data.totalPages);
                      setSearchCount(response.data.totalElements);
                  } catch (error) {
                      console.log('고객사 질문 요약 조회 실패: ', error);
                  } finally {
                      setListLoading(false);
                  }
              }
            : async () => {
                  try {
                      const response = await getAllQuestion(
                          currentPage - 1,
                          filterArgs,
                      );
                      setQuestionSummary(response.data.questionsInfo);
                      setTotalPages(response.data.totalPages);
                      setSearchCount(response.data.totalElements);
                  } catch (error) {
                      console.log('담당자 질문 요약 조회 실패: ', error);
                  } finally {
                      setListLoading(false);
                  }
              };

    useEffect(() => {
        fetchGetQuestionCount();
        fetchGetAnswerCount();
        fetchGetColCount();
    }, [userId]);

    useEffect(() => {
        fetchGetQuestions();
    }, [userId, currentPage, filterArgs]);

    useEffect(() => {
        let args = '';
        if (title) {
            args += `${args ? '&' : ''}title=${title}`;
        }
        if (startDate) {
            const s = `startDate=${
                new Date(startDate).toISOString().split('T')[0]
            }`;
            args += `${args ? '&' : ''}${s}`;
        }
        if (endDate) {
            const e = `endDate=${
                new Date(endDate).toISOString().split('T')[0]
            }`;
            args += `${args ? '&' : ''}${e}`;
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
        if (idFilter) {
            args += `${args ? '&' : ''}managerId=${idFilter}`;
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
        idFilter,
        typeFilter,
    ]);

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
    }, []);

    return (
        <>
            {isViewLoading || isListLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                    }}
                    width={'100%'}
                    height={'65vh'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <QuestionOverview
                        questionCount={questionCount}
                        answerCount={answerCount}
                        colCount={colCount}
                    />
                    {searchCount ? (
                        <div className={Voc_Dashboard}>
                            검색 결과는 총 <span>{searchCount}</span>
                            건입니다.
                            {role === 'customer' && (
                                <VocButton
                                    btnName={'문의 등록'}
                                    backgroundColor={'#ffffff'}
                                    textColor={'#03507d'}
                                    onClick={() => {
                                        navigate('/voc-form/question');
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <div className={Voc_Dashboard}>
                            검색 결과가 없습니다.
                            {role === 'customer' && (
                                <VocButton
                                    btnName={'문의 등록'}
                                    backgroundColor={'#ffffff'}
                                    textColor={'#03507d'}
                                    onClick={() => {
                                        navigate('/voc-form/question');
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <QuestionFilterInput
                        title={title}
                        questionNo={questionNo}
                        customerName={customerName}
                        startDate={startDate}
                        endDate={endDate}
                        setTitle={setTitle}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setQuestionNo={setQuestionNo}
                        setCustomerName={setCustomerName}
                        setTimeFilter={setTimeFilter}
                        setStatusFilter={setStatusFilter}
                        setIdFilter={setIdFilter}
                        setTypeFilter={setTypeFilter}
                    />
                    <QuestionList
                        questionSummary={questionSummary}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </>
    );
}
