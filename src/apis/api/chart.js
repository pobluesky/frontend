import axiosInstance from '../utils/axiosInstance';

// 월별 Inquiry 접수건 주문 체결 소요일 평균
export const getAverageMonthly = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/inquiries/dashboard/average-monthly',
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(
            '월별 Inquiry 접수건 주문 체결 소요일 평균 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 전체 제품별 주문 처리 현황
export const getCountByProductType = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/inquiries/dashboard/counts-by-productType',
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(
            '전체 제품별 주문 처리 현황 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// Inquiry 주문 완료 및 미완료 비중
export const getPercentageCompletedOrNot = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/inquiries/dashboard/percentage-completed-uncompleted',
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(
            'Inquiry 주문 완료 및 미완료 비중 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 전체 Inquiry 검토 현황별 건수
export const getCountsByProgress = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/inquiries/dashboard/counts-by-progress',
        );

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(
            '전체 Inquiry 검토 현황별 건수 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};
