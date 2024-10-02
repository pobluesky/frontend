import React from 'react';
import { Col_Status } from '../../assets/css/Voc.css';

export default function ColStatus({ setProgressFilter }) {
    return (
        <div className={Col_Status}>
            <div
                onClick={() => {
                    setProgressFilter('');
                }}
            >
                전체
            </div>
            <div
                onClick={() => {
                    setProgressFilter('COMPLETE');
                }}
            >
                협업 완료
            </div>
            <div
                onClick={() => {
                    setProgressFilter('READY');
                }}
            >
                협업 대기
            </div>
            <div
                onClick={() => {
                    setProgressFilter('INPROGRESS');
                }}
            >
                협업 수락
            </div>
            <div
                onClick={() => {
                    setProgressFilter('REFUSE');
                }}
            >
                협업 거절
            </div>
        </div>
    );
}
