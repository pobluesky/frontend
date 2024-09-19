import React from 'react';
import VocPath from '../../components/atoms/VocPath';
import AnswerForm from './../../components/templates/AnswerForm';

export default function VocAnswerForm() {
    return (
        <>
            <VocPath largeCategory={'문의'} mediumCategory={'문의 등록'} />
            <AnswerForm />
        </>
    );
}
