import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const InquiryOrderPeriodChart = ({ orderPeriod }) => {
    // 임시 데이터 삽입
    const data = [
        {
            id: '전체',
            color: '#D9A9FF',
            data: [
                {
                    x: '1월',
                    // y: orderPeriod.total[0][1],
                    y: 23,
                },
                {
                    x: '2월',
                    // y: orderPeriod.total[1][1],
                    y: 11,
                },
                {
                    x: '3월',
                    // y: orderPeriod.total[2][1],
                    y: 13,
                },
                {
                    x: '4월',
                    // y: orderPeriod.total[3][1],
                    y: 12,
                },
                {
                    x: '5월',
                    // y: orderPeriod.total[4][1],
                    y: 22,
                },
                {
                    x: '6월',
                    // y: orderPeriod.total[5][1],
                    y: 29,
                },
                {
                    x: '7월',
                    // y: orderPeriod.total[6][1],
                    y: 18,
                },
                {
                    x: '8월',
                    // y: orderPeriod.total[7][1],
                    y: 17,
                },
                {
                    x: '9월',
                    // y: orderPeriod.total[8][1],
                    y: 14,
                },
                {
                    x: '10월',
                    // y: orderPeriod.total[9][1],
                    y: 15,
                },
                {
                    x: '11월',
                    // y: orderPeriod.total[10][1],
                    y: 21,
                },
                {
                    x: '12월',
                    // y: orderPeriod.total[11][1],
                    y: 24,
                },
            ],
        },
        {
            id: '담당자',
            color: '#ADE8FF',
            data: [
                {
                    x: '1월',
                    // y: orderPeriod.manager[0][1],
                    y: 15,
                },
                {
                    x: '2월',
                    // y: orderPeriod.manager[1][1],
                    y: 22,
                },
                {
                    x: '3월',
                    // y: orderPeriod.manager[2][1],
                    y: 18,
                },
                {
                    x: '4월',
                    // y: orderPeriod.manager[3][1],
                    y: 13,
                },
                {
                    x: '5월',
                    // y: orderPeriod.manager[4][1],
                    y: 28,
                },
                {
                    x: '6월',
                    // y: orderPeriod.manager[5][1],
                    y: 14,
                },
                {
                    x: '7월',
                    // y: orderPeriod.manager[6][1],
                    y: 21,
                },
                {
                    x: '8월',
                    // y: orderPeriod.manager[7][1],
                    y: 18,
                },
                {
                    x: '9월',
                    // y: orderPeriod.manager[8][1],
                    y: 18,
                },
                {
                    x: '10월',
                    // y: orderPeriod.manager[9][1],
                    y: 14,
                },
                {
                    x: '11월',
                    // y: orderPeriod.manager[10][1],
                    y: 17,
                },
                {
                    x: '12월',
                    // y: orderPeriod.manager[11][1],
                    y: 15,
                },
            ],
        },
    ];

    return (
        <div
            className={Dashboard_Item}
            style={{ width: 'auto', aspectRatio: '1.8 / 1', height: '20vw' }}
        >
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 10, bottom: 40, left: 10 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                curve="natural"
                // colors={['#0079FF', '#FF0060']}
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
                lineWidth={0}
                pointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={1}
                areaBaselineValue={11}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
            />
        </div>
    );
};
