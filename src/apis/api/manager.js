import axiosInstance from '../utils/axiosInstance';

// 담당자 전제 조회
export const getAllManager = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers',
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error('담당자 전제 조회 API ERROR: ', error.message || error);
        throw error;
    }
};

// 담당자 상세 조회
// 본인이 아닌 타인 검색 불가 (수정 필요)
export const getManagerByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(
            `/managers/${userId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error('담당자 상세 조회 API ERROR: ', error.message || error);
        throw error;
    }
};

// 판매 담당자 전체 조회
export const getAllSalesManager = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/sales',
        );

        const json = response.data;

        return json;
    } catch (error) {
        console.error('판매 담당자 전제 조회 API ERROR: ', error.message || error);
        throw error;
    }
};

// 품질 담당자 전체 조회
export const getAllQualityManager = async () => {
    try {
        const response = await axiosInstance.get(
            '/managers/quality',
        );

        const json = response.data;

        return json;
    } catch (error) {
        console.error('품질 담당자 전제 조회 API ERROR: ', error.message || error);
        throw error;
    }
};

// Inquiry 품질 담당자 배정
export const assignQualityManagerByUserId = async (inquiryId, qualityManagerId) => {
    try {
        await axiosInstance.put(
            `/managers/inquiries/${inquiryId}/allocate/${qualityManagerId}`,
        );
    } catch (error) {
        console.error('Inquiry 품질 담당자 전제 조회 API ERROR: ', error.message || error);
        throw error;
    }
};