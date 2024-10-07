import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const InquiryOrderCountManagerChart = ({ orderCount, name }) => {
    const managerCompleted = Math.round(orderCount.manager.completed);
    const managerUncompleted = Math.round(orderCount.manager.uncompleted);

    const data = [
        {
            id: '체결 완료됨',
            label: '체결 완료됨',
            value: managerCompleted,
        },
        {
            id: '체결 미완료',
            label: '체결 미완료',
            value: managerUncompleted,
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
            <span>{name} 담당자 Inquiry 주문 완료/미완료 비중</span>
            <ResponsivePie
                data={data}
                theme={{
                    legends: { text: { fontSize: 12 } },
                    text: { fontSize: 16 },
                }}
                margin={{ top: 20, right: 0, bottom: 60, left: 0 }}
                innerRadius={0.6}
                padAngle={3}
                activeOuterRadiusOffset={8}
                colors={['#FF8484', '#FEF6C0']}
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
                        justify: true,
                        translateX: 0,
                        translateY: 30,
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
