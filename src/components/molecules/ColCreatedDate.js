import React from 'react';
import Input from '../atoms/Input';
import { Col_Created_Date } from '../../assets/css/Voc.css';

export default function ColCreatedDate({
    setTimeFilter,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
}) {
    return (
        <div className={Col_Created_Date}>
            <div
                onClick={() => {
                    setTimeFilter('LATEST');
                    setStartDate('');
                    setEndDate('');
                }}
            >
                전체
            </div>
            <div
                onClick={() => {
                    setTimeFilter('LATEST');
                }}
            >
                최신순 ▲
            </div>
            <div
                onClick={() => {
                    setTimeFilter('OLDEST');
                }}
            >
                과거순 ▼
            </div>
            <Input
                type={'date'}
                width={'128px'}
                height={'24px'}
                border={'solid 1px #c1c1c1'}
                borderRadius={'8px'}
                outline={'none'}
                padding={'0 8px 0 8px'}
                value={startDate}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
                type={'date'}
                width={'128px'}
                height={'24px'}
                border={'solid 1px #c1c1c1'}
                borderRadius={'8px'}
                outline={'none'}
                padding={'0 8px 0 8px'}
                value={endDate}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
    );
}
