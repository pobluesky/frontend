import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { Dashboard_Item } from '../../assets/css/Chart.css';

export const InquiryProgressCountManagerChart = ({ progressCount }) => {
    let submit = 0;
    let receipt = 0;
    let first_review_completed = 0;
    let quality_review_request = 0;
    let quality_review_response = 0;
    let quality_review_completed = 0;
    let final_review_completed = 0;

    progressCount.manager.map((progressCount) => {
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
            id: 'japan',
            color: 'hsl(9, 70%, 50%)',
            data: [
                {
                    x: '문의 제출',
                    y: submit,
                },
                {
                    x: '문의 접수',
                    y: receipt,
                },
                {
                    x: '1차검토완료',
                    y: first_review_completed,
                },
                {
                    x: '품질검토요청',
                    y: quality_review_request,
                },
                {
                    x: '품질검토접수',
                    y: quality_review_response,
                },
                {
                    x: '품질검토완료',
                    y: quality_review_completed,
                },
                {
                    x: '최종검토완료',
                    y: final_review_completed,
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
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                colors={['#FF0160']}
                colorBy="index"
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 9,
                    tickPadding: 8,
                    tickRotation: 0,
                }}
                axisLeft={null}
                enableGridY={false}
                lineWidth={5}
                pointSize={5}
                pointBorderWidth={5}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableArea={false}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[]}
            />
        </div>
    );
};
