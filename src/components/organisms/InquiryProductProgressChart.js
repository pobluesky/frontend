import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { Dashboard_Item } from '../../assets/css/Chart.css';

const productNames = {
    CAR: '자동차',
    HOT_ROLLED: '열연',
    COLD_ROLLED: '냉연',
    WIRE_ROD: '선재',
    THICK_PLATE: '후판',
};

export function InquiryProductProgressChart({ data, name }) {
    const [percent, setPercent] = useState(0.0);
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);

    const managerArr = [
        ['CAR', 0],
        ['HOT_ROLLED', 0],
        ['COLD_ROLLED', 0],
        ['WIRE_ROD', 0],
        ['THICK_PLATE', 0],
    ];

    const totalArr = [
        ['CAR', 0],
        ['HOT_ROLLED', 0],
        ['COLD_ROLLED', 0],
        ['WIRE_ROD', 0],
        ['THICK_PLATE', 0],
    ];

    data.manager.forEach((item) => {
        const index = managerArr.findIndex((entry) => entry[0] === item[0]);
        if (index !== -1) managerArr[index][1] = item[1];
    });

    data.total.forEach((item) => {
        const index = totalArr.findIndex((entry) => entry[0] === item[0]);
        if (index !== -1) totalArr[index][1] = item[1];
    });

    const ratioArr = managerArr.map((entry, idx) => {
        const total = totalArr[idx][1];
        return [
            entry[0],
            total === 0 ? 0 : Math.round((entry[1] / total) * 100),
        ];
    });

    const productChange = (direction) => {
        const newIndex =
            (selectedProductIndex + direction + managerArr.length) %
            managerArr.length;
        setSelectedProductIndex(newIndex);
        const selected = ratioArr[newIndex];
        setPercent(selected[1] / 100);
    };

    const selectedProduct = ratioArr[selectedProductIndex][0];

    return (
        <div
            className={Dashboard_Item}
            style={{ width: 'auto', aspectRatio: '1.8 / 1', height: '20vw' }}
        >
            <div>{name}님의 제품별 주문 체결 현황</div>
            <GaugeChart
                id="gauge-chart5"
                arcsLength={[1.428, 1.428, 1.428, 1.428, 1.428, 1.428, 1.432]}
                colors={['#5BE12C', '#F5CD19', '#EA4228']}
                percent={percent}
                cornerRadius={3}
                arcPadding={0.02}
                hideText={true}
                animDelay={0}
                animateDuration={2000}
            />
            <div>
                {productNames[selectedProduct]} {Math.round(percent * 100)}%
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                }}
            >
                <button onClick={() => productChange(-1)}>◀</button>
                <span style={{ margin: '0 20px', fontWeight: 'bold' }}>
                    {productNames[selectedProduct]}
                </span>
                <button onClick={() => productChange(1)}>▶</button>
            </div>
        </div>
    );
}
