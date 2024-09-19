import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getCookie } from '../../apis/utils/cookies';
import {
    Question_List_Container,
    Question_List,
    Ready,
    Completed,
} from '../../assets/css/Voc.css';
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

export default function QuestionList({
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
}) {
    const { userId } = useAuth();
    const role = getCookie('userRole');
    const navigate = useNavigate();

    const [filterArgs, setFilterArgs] = useState('');
    const [questionSummary, setQuestionSummary] = useState([]);

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

    useEffect(() => {
        fetchGetQuestions();
    }, [userId, filterArgs]);

    const contentsEllipsis = {
        maxWidth: '1320px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <div className={Question_List_Container}>
            {questionSummary.map((data, idx) => (
                <div key={idx}>
                    {!idx && <hr />}
                    <div
                        className={Question_List}
                        onClick={() => {
                            navigate('/voc-form/answer', {
                                state: {
                                    questionId: data.questionId,
                                    status: data.status,
                                    /* 필요한 다른 데이터들 */
                                },
                            });
                        }}
                    >
                        <div>
                            <div>
                                {data.type === 'INQ'
                                    ? 'Inquiry 문의'
                                    : data.type === 'SITE'
                                    ? '사이트 문의'
                                    : '기타 문의'}
                            </div>
                            {data.status === 'READY' ? (
                                <div className={Ready}>답변 대기</div>
                            ) : (
                                <div className={Completed}>답변 완료</div>
                            )}
                            <div>{data.title}</div>
                        </div>
                        <div style={contentsEllipsis}>
                            {data.contents.replace(/<\/?[^>]+(>|$)/g, '')}
                        </div>
                        <div>
                            <div>{data.questionCreatedAt.substring(0, 10)}</div>
                            <div>{data.customerName}</div>
                            {/* <div>
                            {data.answerCreatedAt &&
                                data.answerCreatedAt.substring(0, 10)}
                        </div> */}
                        </div>
                        <hr />
                    </div>
                </div>
            ))}
        </div>
    );
}
