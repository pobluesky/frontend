import React, { useState } from 'react';
import VocPath from '../../components/atoms/VocPath';
import AnswerForm from './../../components/templates/AnswerForm';

export default function VocAnswerForm() {
    const [vocNo, setVocNo] = useState('');

    return (
        <>
            <VocPath
                largeCategory={'VoC'}
                mediumCategory={'문의 목록'}
                smallCategory={vocNo}
            />
            <AnswerForm setVocNo={setVocNo} />
        </>
    );
}
