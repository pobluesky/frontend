import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const InquiryProgressCountTotalChart = ({ progressCount }) => {
    let submit = 0;
    let receipt = 0;
    let first_review_completed = 0;
    let quality_review_request = 0;
    let quality_review_response = 0;
    let quality_review_completed = 0;
    let final_review_completed = 0;

    progressCount.total.map((progressCount) => {
        switch (progressCount[0]) {
            case 'SUBMIT':
                submit = progressCount[1];
                break;
            case 'RECEIPT':
                receipt = progressCount[1];
                break;
            case 'FINAL_REVIEW_COMPLETED':
                first_review_completed = progressCount[1];
                break;
            case 'QUALITY_REVIEW_REQUEST':
                quality_review_request = progressCount[1];
                break;
            case 'QUALITY_REVIEW_RESPONSE':
                quality_review_response = progressCount[1];
                break;
            case 'QUALITY_REVIEW_COMPLETED':
                quality_review_completed = progressCount[1];
                break;
            case 'FINAL_REVIEW_COMPLETED':
                final_review_completed = progressCount[1];
        }
    });

    const data = [
        {
            id: '문의 제출',
            label: '문의 제출',
            전체: submit,
        },
        {
            id: '문의 접수',
            label: '문의 접수',
            전체: receipt,
        },
        {
            id: '1차검토완료',
            label: '1차검토완료',
            전체: first_review_completed,
        },
        {
            id: '품질검토요청',
            label: '품질검토요청',
            전체: quality_review_request,
        },
        {
            id: '품질검토접수',
            label: '품질검토접수',
            전체: quality_review_response,
        },
        {
            id: '품질검토완료',
            label: '품질검토완료',
            전체: quality_review_completed,
        },
        {
            id: '최종검토완료',
            label: '최종검토완료',
            전체: final_review_completed,
        },
    ];

    return (
        <div
            className={Dashboard_Item}
            style={{
                aspectRatio: '2.2 / 1',
                height: '16vw',
            }}
        >
            <span>담당자 전체 제품별 주문 처리 현황</span>
            <ResponsiveBar
                data={data}
                theme={{
                    legends: { text: { fontSize: 12 } },
                }}
                keys={['전체']}
                margin={{ top: 30, right: 0, bottom: 80, left: 0 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['#21CDC7']}
                colorBy="index"
                borderRadius={15}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 9,
                    tickPadding: 8,
                    tickRotation: 0,
                }}
                axisLeft={null}
                enableGridX={true}
                enableLabel={false}
                enableTotals={true}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', '1.6']],
                }}
                legends={[
                    {
                        data: [{ label: '담당자 평균', color: '#21CDC7' }],
                        anchor: 'bottom',
                        direction: 'row',
                        justify: true,
                        translateX: 0,
                        translateY: 55,
                        itemsSpacing: 50,
                        itemWidth: 100,
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
