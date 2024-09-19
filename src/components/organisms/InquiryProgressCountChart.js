import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Chart_Container } from '../../assets/css/Chart.css';

// 전체 Inquiry 검토 현황별 건수
class InquiryProgressCountChart extends Component {
    constructor(props) {
        super(props);

        const { data } = props;

        const managerMaxRange = data.manager.reduce((max, current) => {
            return current[1] > max[1] ? current : max;
        }, data.manager[0]);

        const totalMaxRange = data.total.reduce((max, current) => {
            return current[1] > max[1] ? current : max;
        }, data.total[0]);

        const maxM =
            managerMaxRange[1] % 5
                ? managerMaxRange[1] + 5 - (managerMaxRange[1] % 5)
                : managerMaxRange[1] + 5;

        const maxT =
            totalMaxRange[1] % 5
                ? totalMaxRange[1] + 5 - (totalMaxRange[1] % 5)
                : totalMaxRange[1] + 5;

        const managerArr = [
            ['SUBMIT', 0],
            ['RECEIPT', 0],
            ['QUALITY_REVIEW_REQUEST', 0],
            ['QUALITY_REVIEW_RESPONSE', 0],
            ['QUALITY_REVIEW_COMPLETED', 0],
            ['FINAL_REVIEW_COMPLETED', 0],
        ];

        const totalArr = [
            ['SUBMIT', 0],
            ['RECEIPT', 0],
            ['QUALITY_REVIEW_REQUEST', 0],
            ['QUALITY_REVIEW_RESPONSE', 0],
            ['QUALITY_REVIEW_COMPLETED', 0],
            ['FINAL_REVIEW_COMPLETED', 0],
        ];

        data.manager.map((data) => {
            switch (data[0]) {
                case 'SUBMIT':
                    managerArr[0][1] = data[1];
                    break;
                case 'RECEIPT':
                    managerArr[1][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_REQUEST':
                    managerArr[2][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_RESPONSE':
                    managerArr[3][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_COMPLETED':
                    managerArr[4][1] = data[1];
                    break;
                case 'FINAL_REVIEW_COMPLETED':
                    managerArr[5][1] = data[1];
            }
        });

        data.total.map((data) => {
            switch (data[0]) {
                case 'SUBMIT':
                    totalArr[0][1] = data[1];
                    break;
                case 'RECEIPT':
                    totalArr[1][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_REQUEST':
                    totalArr[2][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_RESPONSE':
                    totalArr[3][1] = data[1];
                    break;
                case 'QUALITY_REVIEW_COMPLETED':
                    totalArr[4][1] = data[1];
                    break;
                case 'FINAL_REVIEW_COMPLETED':
                    totalArr[5][1] = data[1];
                    break;
            }
        });

        this.state = {
            options: {
                chart: {
                    id: '전체 Inquiry 검토 현황별 건수',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                xaxis: {
                    categories: [
                        '1step',
                        '2step',
                        '3step',
                        '4step',
                        '5step',
                        '6step',
                        '7step',
                    ],
                    axisTicks: {
                        show: false,
                    },
                    axisBorder: {
                        show: false,
                    },
                },
                grid: {
                    show: false,
                },
                stroke: {
                    width: [0, 4],
                },
                markers: {
                    size: 2, // 라인 차트 위에 표현되는 마커
                    strokeColors: '#00DFA2',
                    hover: {
                        size: 4,
                    },
                },
                fill: {
                    type: 'solid', // 'gradient', 'solid', 'pattern', 'image'
                },
                colors: ['#FF0060', '#00DFA2'],
                yaxis: [
                    {
                        axisBorder: {
                            show: false,
                        },
                        title: {
                            text: '전체 평균',
                            style: {
                                color: '#25262B',
                                fontSize: '12px',
                                fontFamily: 'Pretendard-Regular',
                                fontWeight: 500,
                                cssClass: 'apexcharts-yaxis-title',
                            },
                        },
                        min: 0,
                        max: maxT,
                        tickAmount: 5,
                        labels: {
                            formatter: function (value) {
                                return Math.floor(value);
                            },
                        },
                    },
                    {
                        axisBorder: {
                            show: false,
                        },
                        opposite: true,
                        title: {
                            text: '개인 평균',
                            style: {
                                color: '#25262B',
                                fontSize: '12px',
                                fontFamily: 'Pretendard-Regular',
                                fontWeight: 500,
                                cssClass: 'apexcharts-yaxis-title',
                            },
                        },
                        min: 0,
                        max: maxM,
                        tickAmount: 5,
                        labels: {
                            formatter: function (value) {
                                return Math.floor(value);
                            },
                        },
                    },
                ],

                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    fontSize: '14px',
                    fontFamily: 'Pretendard-Regular',
                    fontWeight: 400,
                    markers: {
                        size: 4,
                        shape: 'square',
                        strokeWidth: 0,
                    },
                    itemMargin: {
                        horizontal: 5,
                        vertical: 0,
                    },
                    onItemClick: {
                        toggleDataSeries: true,
                    },
                    onItemHover: {
                        highlightDataSeries: true,
                    },
                },
                title: {
                    text: '전체 Inquiry 검토 현황별 건수',
                    align: 'center',
                    margin: 5,
                    floating: false,
                    style: {
                        fontSize: '16px',
                        fontWeight: 500,
                        fontFamily: 'Pretendard-Regular',
                        color: '#25262B',
                    },
                },
            },
            series: [
                {
                    name: '전체 평균',
                    type: 'column',
                    data: totalArr.map((data) =>
                        data[1] !== 0 ? data[1] : null,
                    ),
                },
                {
                    name: '나의 평균',
                    type: 'line',
                    data: managerArr.map((data) =>
                        data[1] !== 0 ? data[1] : null,
                    ),
                },
            ],
        };
    }

    render() {
        return (
            <div className={Chart_Container}>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    width="450"
                    height="240"
                />
            </div>
        );
    }
}

export default InquiryProgressCountChart;
