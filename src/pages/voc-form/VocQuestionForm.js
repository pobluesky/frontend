import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VocPath from '../../components/atoms/VocPath';
import QuestionForm from '../../components/templates/QuestionForm';
import { getCookie } from '../../apis/utils/cookies';

export default function VocQuestionForm() {
    const role = getCookie('userRole');

    const location = useLocation();
    const { questionDetail } = location.state || '';

    // 고객사만 질문 등록 가능
    useEffect(() => {
        if (role !== 'customer') {
            navigate('/voc-list/question');
        }
    }, []);

    return (
        <>
            <VocPath largeCategory={'문의'} mediumCategory={'문의 등록'} />
            <QuestionForm questionDetail={questionDetail} />
        </>
    );
}
