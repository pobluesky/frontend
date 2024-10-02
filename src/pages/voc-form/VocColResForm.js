import React from 'react';
import ColPath from '../../components/atoms/ColPath';
import ColResForm from '../../components/templates/ColResForm';

export default function VocColResForm() {
    return (
        <>
            <ColPath largeCategory={'문의 목록'} mediumCategory={'협업 응답'} />
            <ColResForm />
        </>
    );
}
