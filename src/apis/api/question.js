import axiosInstance from '../utils/axiosInstance';

// 담당자용 질문 전체 조회
export const getAllQuestion = async (filterArgs) => {
    try {
        const response = await axiosInstance.get(
            `/questions/managers?${filterArgs}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '담당자용 질문 요약 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 담당자용 질문 상세 조회
export const getQuestionByQuestionIdForManager = async (questionId) => {
    try {
        const response = await axiosInstance.get(
            `/questions/managers/${questionId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '담당자용 질문 상세 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 고객별 질문 전체 조회
export const getQuestionByUserId = async (userId, filterArgs) => {
    try {
        const response = await axiosInstance.get(
            `/questions/customers/${userId}?${filterArgs}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(
            '고객사용 질문 요약 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 고객사용 질문 상세 조회
export const getQuestionByQuestionId = async (userId, questionId) => {
    try {
        const response = await axiosInstance.get(
            `/questions/customers/${userId}/${questionId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }
        return json;
    } catch (error) {
        console.error(
            '고객사용 질문 상세 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// Inquiry 관련 질문 등록
export const postQuestionByUserIdAboutInquiry = async (
    file,
    questionData,
    userId,
    inquiryId,
) => {
    try {
        const formData = new FormData();
        formData.append(
            'question',
            new Blob([JSON.stringify(questionData)], {
                type: 'application/json',
            }),
        );

        if (file) {
            formData.append('files', file);
        }

        const response = await axiosInstance({
            method: 'post',
            url: `/questions/customers/${userId}/${inquiryId}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error('INQ 질문 등록 API ERROR: ', error.message || error);
        throw error;
    }
};

// Inquiry 무관 질문 등록
export const postQuestionByUserId = async (file, questionData, userId) => {
    try {
        const formData = new FormData();
        formData.append(
            'question',
            new Blob([JSON.stringify(questionData)], {
                type: 'application/json',
            }),
        );

        if (file) {
            formData.append('files', file);
        }

        const response = await axiosInstance({
            method: 'post',
            url: `/questions/customers/${userId}`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error('기타 질문 등록 API ERROR: ', error.message || error);
        throw error;
    }
};
