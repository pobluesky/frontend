import React from 'react';
import ColPath from '../../components/atoms/ColPath';
import ColDashboard from '../../components/templates/ColDashboard';

export default function VocCollist() {
    return (
        <>
            <ColPath
                largeCategory={'협업 목록'}
                mediumCategory={'협업 목록 조회'}
            />
            <ColDashboard />
        </>
    );
}
