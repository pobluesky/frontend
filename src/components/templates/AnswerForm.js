import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../../apis/utils/cookies';
import QuestionViewer from '../organisms/QuestionViewer';
import AnswerInput from '../organisms/AnswerInput';
import {
    getQuestionByQuestionId,
    getQuestionByQuestionIdForManager,
} from '../../apis/api/question';
import {
    getAnswerByQuestionId,
    getAnswerByQuestionIdForManager,
} from '../../apis/api/answer';
import { useAuth } from '../../hooks/useAuth';

export default function AnswerForm() {
    const location = useLocation();
    const { questionId } = location.state;
    const { userId } = useAuth();
    const role = getCookie('userRole');

    const [questionDetail, setQuestionDetail] = useState(
        JSON.parse(localStorage.getItem(`questionDetail-${questionId}`)) || []
    );
    const [answerDetail, setAnswerDetail] = useState(
        JSON.parse(localStorage.getItem(`answerDetail-${questionId}`)) || []
    );

    // 질문 상세 조회
    const fetchGetQuestionDetail = role === 'customer'
        ? async (questionId) => {
            try {
                const response = await getQuestionByQuestionId(userId, questionId);
                setQuestionDetail(response.data);
                localStorage.setItem(`questionDetail-${questionId}`, JSON.stringify(response.data));
                if (response.data.status === 'COMPLETED') {
                    fetchGetAnswerDetail(questionId);
                } else {
                    setAnswerDetail([]);
                    localStorage.removeItem(`answerDetail-${questionId}`);
                }
            } catch (error) {
                console.log('고객사 질문 상세 조회 실패: ', error);
            }
        }
        : async (questionId) => {
            try {
                const response = await getQuestionByQuestionIdForManager(questionId);
                setQuestionDetail(response.data);
                localStorage.setItem(`questionDetail-${questionId}`, JSON.stringify(response.data));
                if (response.data.status === 'COMPLETED') {
                    fetchGetAnswerDetail(questionId);
                } else {
                    setAnswerDetail([]);
                    localStorage.removeItem(`answerDetail-${questionId}`);
                }
            } catch (error) {
                console.log('담당자 질문 상세 조회 실패: ', error);
            }
        };

    // 답변 상세 조회
    const fetchGetAnswerDetail = role === 'customer'
        ? async (questionId) => {
            try {
                const response = await getAnswerByQuestionId(userId, questionId);
                setAnswerDetail(response.data);
                localStorage.setItem(`answerDetail-${questionId}`, JSON.stringify(response.data));
            } catch (error) {
                console.log('고객사 답변 상세 조회 실패: ', error);
            }
        }
        : async (questionId) => {
            try {
                const response = await getAnswerByQuestionIdForManager(questionId);
                setAnswerDetail(response.data);
                localStorage.setItem(`answerDetail-${questionId}`, JSON.stringify(response.data));
            } catch (error) {
                console.log('담당자 답변 상세 조회 실패: ', error);
            }
        };

    useEffect(() => {
        fetchGetQuestionDetail(questionId);
    }, [questionId]);

    return (
        <div>
            <QuestionViewer questionDetail={questionDetail} />
            <AnswerInput
                questionId={questionId}
                questionDetail={questionDetail}
                answerDetail={answerDetail}
                setAnswerDetail={setAnswerDetail}
            />
        </div>
    );
}
