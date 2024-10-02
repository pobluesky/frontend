import React from 'react';
import { getCookie } from '../../apis/utils/cookies';
import { Col_Manager } from '../../assets/css/Voc.css';

export default function ColResManager({ setColResFilter }) {
    const userId = getCookie('userId');

    return (
        <div className={Col_Manager}>
            <div
                onClick={() => {
                    setColResFilter('');
                }}
            >
                전체
            </div>
            <div
                onClick={() => {
                    setColResFilter(userId);
                }}
            >
                내 협업
            </div>
        </div>
    );
}
