import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Chart_Container } from '../../assets/css/Chart.css';

// 월별 Inquiry 접수-주문 체결 평균 처리 기간
class InquiryMonthlyOrderChart extends Component {
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

        this.state = {
            options: {
                chart: {
                    id: '월별 Inquiry 접수-주문 체결 평균 처리 기간',
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                xaxis: {
                    categories: [
                        '1월',
                        '2월',
                        '3월',
                        '4월',
                        '5월',
                        '6월',
                        '7월',
                        '8월',
                        '9월',
                        '10월',
                        '11월',
                        '12월',
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
                    curve: 'smooth', // straight
                },
                fill: {
                    type: 'solid', // 'gradient', 'solid', 'pattern', 'image'
                },
                colors: ['#0079FF', '#FF0060'],
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
                        max: maxT,
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
                    text: '월별 Inquiry 접수-주문 체결 평균 처리 기간',
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
                    data: props.data.total.map((data) =>
                        data[1] !== 0 ? data[1] : null,
                    ),
                },
                {
                    name: '나의 평균',
                    data: props.data.manager.map((data) =>
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

export default InquiryMonthlyOrderChart;
