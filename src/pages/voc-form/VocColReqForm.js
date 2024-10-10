import React from 'react';
import VocPath from '../../components/atoms/VocPath';
import ColReqForm from '../../components/templates/ColReqForm';

export default function VocColReqForm() {
    return (
        <>
            <VocPath
                largeCategory={'VoC'}
                mediumCategory={'문의 목록'}
                smallCategory={'협업 등록'}
            />
            <ColReqForm />
        </>
    );
}
