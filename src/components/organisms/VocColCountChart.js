import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const VocColCountChart = ({ colCount, name }) => {
    // const data = [
    //     {
    //         id: '전체',
    //         color: '#D9A9FF',
    //         data: [
    //             {
    //                 x: '1월',
    //                 y: colCount.total[0][1],
    //             },
    //             {
    //                 x: '2월',
    //                 y: colCount.total[1][1],
    //             },
    //             {
    //                 x: '3월',
    //                 y: colCount.total[2][1],
    //             },
    //             {
    //                 x: '4월',
    //                 y: colCount.total[3][1],
    //             },
    //             {
    //                 x: '5월',
    //                 y: colCount.total[4][1],
    //             },
    //             {
    //                 x: '6월',
    //                 y: colCount.total[5][1],
    //             },
    //             {
    //                 x: '7월',
    //                 y: colCount.total[6][1],
    //             },
    //             {
    //                 x: '8월',
    //                 y: colCount.total[7][1],
    //             },
    //             {
    //                 x: '9월',
    //                 y: colCount.total[8][1],
    //             },
    //             {
    //                 x: '10월',
    //                 y: colCount.total[9][1],
    //             },
    //             {
    //                 x: '11월',
    //                 y: colCount.total[10][1],
    //             },
    //             {
    //                 x: '12월',
    //                 y: colCount.total[11][1],
    //             },
    //         ],
    //     },
    //     {
    //         id: '담당자',
    //         color: '#ADE8FF',
    //         data: [
    //             {
    //                 x: '1월',
    //                 y: colCount.manager[0][1],
    //             },
    //             {
    //                 x: '2월',
    //                 y: colCount.manager[1][1],
    //             },
    //             {
    //                 x: '3월',
    //                 y: colCount.manager[2][1],
    //             },
    //             {
    //                 x: '4월',
    //                 y: colCount.manager[3][1],
    //             },
    //             {
    //                 x: '5월',
    //                 y: colCount.manager[4][1],
    //             },
    //             {
    //                 x: '6월',
    //                 y: colCount.manager[5][1],
    //             },
    //             {
    //                 x: '7월',
    //                 y: colCount.manager[6][1],
    //             },
    //             {
    //                 x: '8월',
    //                 y: colCount.manager[7][1],
    //             },
    //             {
    //                 x: '9월',
    //                 y: colCount.manager[8][1],
    //             },
    //             {
    //                 x: '10월',
    //                 y: colCount.manager[9][1],
    //             },
    //             {
    //                 x: '11월',
    //                 y: colCount.manager[10][1],
    //             },
    //             {
    //                 x: '12월',
    //                 y: colCount.manager[11][1],
    //             },
    //         ],
    //     },
    // ];

    const data = [
        {
            id: '전체',
            data: [
                { x: '1월', y: 85 },
                { x: '2월', y: 92 },
                { x: '3월', y: 78 },
                { x: '4월', y: 94 },
                { x: '5월', y: 81 },
                { x: '6월', y: 70 },
                { x: '7월', y: 76 },
                { x: '8월', y: 88 },
                { x: '9월', y: 74 },
                { x: '10월', y: 90 },
                { x: '11월', y: 82 },
                { x: '12월', y: 95 },
            ],
        },
        {
            id: '담당자',
            data: [
                { x: '1월', y: 30 },
                { x: '2월', y: 25 },
                { x: '3월', y: 40 },
                { x: '4월', y: 12 },
                { x: '5월', y: 20 },
                { x: '6월', y: 45 },
                { x: '7월', y: 60 },
                { x: '8월', y: 18 },
                { x: '9월', y: 55 },
                { x: '10월', y: 25 },
                { x: '11월', y: 40 },
                { x: '12월', y: 50 },
            ],
        },
    ];

    return (
        <div
            className={Dashboard_Item}
            style={{
                aspectRatio: '1.75 / 1',
                height: '12.5vw',
            }}
        >
            <span>월별 협업 처리 건수</span>
            <ResponsiveLine
                data={data}
                theme={{
                    legends: { text: { fontSize: 12 } },
                }}
                margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                colors={['#0079FF', '#A7D1FF']}
                colorBy="index"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 9,
                    tickPadding: 8,
                    tickRotation: 0,
                }}
                axisLeft={null}
                enableGridY={false}
                pointSize={10}
                pointBorderWidth={2}
                pointColor="#ffffff"
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={0}
                areaBaselineValue={11}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        data: [
                            { label: '담당자 평균', color: '#0079FF' },
                            { label: `${name} 평균`, color: '#A7D1FF' },
                        ],
                        anchor: 'bottom',
                        direction: 'row',
                        justify: true,
                        translateX: 0,
                        translateY: 45,
                        itemsSpacing: 20,
                        itemWidth: 80,
                        itemHeight: 0,
                        itemTextColor: '#000000',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </div>
    );
};
