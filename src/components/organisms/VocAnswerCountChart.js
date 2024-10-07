import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const VocAnswerCountChart = ({ answerCount, name }) => {
    // const data = [
    //     {
    //         month: '1월',
    //         전체: answerCount.total[0][1],
    //         담당자: answerCount.manager[0][1],
    //     },
    //     {
    //         month: '2월',
    //         전체: answerCount.total[1][1],
    //         담당자: answerCount.manager[1][1],
    //     },
    //     {
    //         month: '3월',
    //         전체: answerCount.total[2][1],
    //         담당자: answerCount.manager[2][1],
    //     },
    //     {
    //         month: '4월',
    //         전체: answerCount.total[3][1],
    //         담당자: answerCount.manager[4][1],
    //     },
    //     {
    //         month: '5월',
    //         전체: answerCount.total[4][1],
    //         담당자: answerCount.manager[4][1],
    //     },
    //     {
    //         month: '6월',
    //         전체: answerCount.total[5][1],
    //         담당자: answerCount.manager[5][1],
    //     },
    //     {
    //         month: '7월',
    //         전체: answerCount.total[6][1],
    //         담당자: answerCount.manager[6][1],
    //     },
    //     {
    //         month: '8월',
    //         전체: answerCount.total[7][1],
    //         담당자: answerCount.manager[7][1],
    //     },
    //     {
    //         month: '9월',
    //         전체: answerCount.total[8][1],
    //         담당자: answerCount.manager[8][1],
    //     },
    //     {
    //         month: '10월',
    //         전체: answerCount.total[9][1],
    //         담당자: answerCount.manager[9][1],
    //     },
    //     {
    //         month: '11월',
    //         전체: answerCount.total[10][1],
    //         담당자: answerCount.manager[10][1],
    //     },
    //     {
    //         month: '12월',
    //         전체: answerCount.total[11][1],
    //         담당자: answerCount.manager[11][1],
    //     },
    // ];

    const data = [
        { month: '1월', 전체: 56, 담당자: 14 },
        { month: '2월', 전체: 92, 담당자: 10 },
        { month: '3월', 전체: 76, 담당자: 30 },
        { month: '4월', 전체: 72, 담당자: 10 },
        { month: '5월', 전체: 61, 담당자: 10 },
        { month: '6월', 전체: 50, 담당자: 25 },
        { month: '7월', 전체: 58, 담당자: 25 },
        { month: '8월', 전체: 52, 담당자: 17 },
        { month: '9월', 전체: 94, 담당자: 19 },
        { month: '10월', 전체: 66, 담당자: 20 },
        { month: '11월', 전체: 94, 담당자: 22 },
        { month: '12월', 전체: 72, 담당자: 11 },
    ];

    return (
        <div
            className={Dashboard_Item}
            style={{
                aspectRatio: '1.75 / 1',
                height: '12.5vw',
            }}
        >
            <span>월별 VoC 답변 건수</span>
            <ResponsiveBar
                data={data}
                theme={{
                    legends: { text: { fontSize: 12 } },
                }}
                keys={['전체', '담당자']}
                indexBy="month"
                margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['#92E7E4', '#016DBD']}
                colorBy="id"
                borderRadius={0}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 9,
                    tickPadding: 8,
                    tickRotation: 0,
                }}
                axisLeft={null}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                legends={[
                    {
                        data: [
                            { label: '담당자 평균', color: '#92E7E4' },
                            { label: `${name} 평균`, color: '#016DBD' },
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
                        symbolShape: 'square',
                    },
                ]}
            />
        </div>
    );
};
