import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const InquiryOrderCountTotalChart = ({ orderCount }) => {
    const totalCompleted = Math.round(orderCount.total.completed);
    const totalUncompleted = Math.round(orderCount.total.uncompleted);

    const data = [
        {
            id: '체결 완료',
            label: '체결 완료',
            value: totalCompleted,
        },
        {
            id: '체결 미완료',
            label: '체결 미완료',
            value: totalUncompleted,
        },
    ];

    return (
        <div
            className={Dashboard_Item}
            style={{ width: '20vw', aspectRatio: '1 / 1', height: 'auto' }}
        >
            <ResponsivePie
                data={data}
                theme={{
                    legends: { text: { fontSize: 16 } },
                }}
                margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
                innerRadius={0.6}
                padAngle={3}
                activeOuterRadiusOffset={8}
                colors={['#1A91FF', '#B4C8CF']}
                colorBy="index"
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', '3']],
                }}
                enableArcLinkLabels={false}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', '3']],
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 120,
                        itemHeight: 18,
                        itemTextColor: '#000000',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};
