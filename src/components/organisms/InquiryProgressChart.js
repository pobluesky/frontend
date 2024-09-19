import React, { Component } from 'react';
import Chart from 'react-apexcharts';

// 전체 Inquiry 검토 현황별 건수
class InquiryProgressChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'basic-bar',
                },
                xaxis: {
                    categories: [
                        '문의제출',
                        '문의접수',
                        '1차검토완료',
                        '품질검토요청',
                        '품질검토접수',
                        '품질검토완료',
                        '최종검토완료',
                    ],
                },
                stroke: {
                    width: [0, 4],
                },
                markers: {
                    size: 4, // 라인 차트 위에 표현되는 마커
                },
                fill: {
                    type: 'solid', // 'gradient', 'solid', 'pattern', 'image'
                },
                title: {
                    text: '전체 Inquiry 검토 현황별 건수',
                },
            },
            series: [
                {
                    name: '[전체] 전체 Inquiry 검토 현황별 건수', // 평균으로 하면 어떨지?
                    type: 'column',
                    data: [440, 505, 414, 671, 227, 413, 201],
                },
                {
                    name: '[개인] 전체 Inquiry 검토 현황별 건수',
                    type: 'line',
                    data: [23, 42, 35, 27, 43, 22, 17],
                },
            ],
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InquiryProgressChart;
