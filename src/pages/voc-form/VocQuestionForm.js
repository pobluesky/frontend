import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../apis/utils/cookies';
import VocPath from '../../components/atoms/VocPath';
import QuestionForm from '../../components/templates/QuestionForm';

export default function VocQuestionForm() {
    const navigate = useNavigate();
    const role = getCookie('userRole');

    // 고객사만 질문 등록 가능
    useEffect(() => {
        if (role !== 'customer') {
            navigate('/voc-list/question');
        }
    }, []);

    return (
        <>
            <VocPath largeCategory={'문의'} mediumCategory={'문의 등록'} />
            <QuestionForm />
        </>
    );
}
