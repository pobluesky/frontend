import axiosInstance from '../utils/axiosInstance';

// 담당자 전제 초회
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

// 담당자 전제 초회
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