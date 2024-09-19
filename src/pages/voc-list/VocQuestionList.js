import React from 'react';
import VocPath from '../../components/atoms/VocPath';
import QuestionDashboard from '../../components/templates/QuestionDashboard';

export default function VocQuestionList() {
    return (
        <>
            <VocPath largeCategory={'VoC'} mediumCategory={'문의 목록'} />
            <QuestionDashboard />
        </>
    );
}
