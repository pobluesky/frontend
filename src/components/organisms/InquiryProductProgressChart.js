import React, { useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { Chart_Container } from '../../assets/css/Chart.css';

const productNames = {
    CAR: '자동차',
    HOT_ROLLED: '열연',
    COLD_ROLLED: '냉연',
    WIRE_ROD: '선재',
    THICK_PLATE: '후판',
};

function InquiryProductProgressChart({ data }) {
    const [percent, setPercent] = useState(0.0);
    const [selectedProduct, setSelectedProduct] = useState('CAR');

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

    const productChange = (product) => {
        const selected = ratioArr.find((entry) => entry[0] === product);
        if (selected) {
            setPercent(selected[1] / 100);
            setSelectedProduct(product);
        }
    };

    return (
        <div className={Chart_Container}>
            <div>제품별 주문 체결 현황 (전체 대비 나의 성과)</div>
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
            <div>
                {ratioArr.map((product) => (
                    <button
                        key={product[0]}
                        onClick={() => productChange(product[0])}
                    >
                        {productNames[product[0]]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default InquiryProductProgressChart;
