import React, { useState } from 'react';
import ColPath from '../../components/atoms/ColPath';
import ColResForm from '../../components/templates/ColResForm';

export default function VocColResForm() {
    const [colNo, setColNo] = useState('');

    return (
        <>
            <ColPath
                largeCategory={'VoC'}
                mediumCategory={'협업 목록'}
                smallCategory={colNo}
            />
            <ColResForm setColNo={setColNo} />
        </>
    );
}
