import React from 'react';
import ColPath from '../../components/atoms/ColPath';
import ColReqForm from '../../components/templates/ColReqForm';

export default function VocColReqForm() {
    return (
        <>
            <ColPath largeCategory={'문의 목록'} mediumCategory={'협업 요청'} />
            <ColReqForm />
        </>
    );
}
