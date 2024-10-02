import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Chart_Container, Pie_Chart } from '../../assets/css/Chart.css';

// Inquiry 주문 체결 완료 및 미완료 비중
class InquiryOrderCountChart extends Component {
    constructor(props) {
        super(props);

        const { data } = props;

        const managerCompleted = Math.round(data.manager.completed);
        const managerUncompleted = Math.round(data.manager.uncompleted);
        const totalCompleted = Math.round(data.total.completed);
        const totalUncompleted = Math.round(data.total.uncompleted);

        this.state = {
            // 전체
            options1: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                labels: ['주문 체결 미완료', '주문 체결 완료'],
                colors: ['#B3C8CF', '#00A9FF'],
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
            },
            series1: [totalCompleted, totalUncompleted],

            // 내 평균
            options2: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                labels: ['주문 체결 미완료', '주문 체결 완료'],
                colors: ['#B3C8CF', '#F7418F'],
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
            },
            series2: [managerCompleted, managerUncompleted], // 내 평균 데이터
        };
    }

    render() {
        const { name } = this.props;

        return (
            <div className={Chart_Container}>
                <div>{name}님의 Inquiry 주문 체결 완료 및 미완료 비중</div>
                <div>
                    <div>
                        <Chart
                            className={Pie_Chart}
                            options={this.state.options1}
                            series={this.state.series1}
                            type="donut"
                            width="100%"
                        />
                    </div>
                    <div>
                        <Chart
                            className={Pie_Chart}
                            options={this.state.options2}
                            series={this.state.series2}
                            type="donut"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InquiryOrderCountChart;
