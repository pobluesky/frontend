import axiosInstance from '../utils/axiosInstance';

// 담당자용 답변 전체 조회
export const getAllAnswer = async () => {
    try {
        const response = await axiosInstance.get('/answers/managers');

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '담당자 답변 전체 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 고객사용 답변 전체 조회
export const getAnswerByUserId = async (userId) => {
    try {
        const response = await axiosInstance.get(
            `/answers/customers/${userId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '고객사 답변 전체 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 담당자용 답변 상세 조회
export const getAnswerByQuestionIdForManager = async (questionId) => {
    try {
        const response = await axiosInstance.get(
            `/answers/managers/${questionId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '담당자 답변 상세 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 고객사용 답변 상세 조회
export const getAnswerByQuestionId = async (userId, questionId) => {
    try {
        const response = await axiosInstance.get(
            `/answers/customers/${userId}/${questionId}`,
        );

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error(
            '고객사 답변 상세 조회 API ERROR: ',
            error.message || error,
        );
        throw error;
    }
};

// 답변 등록
export const postAnswerByQuestionId = async (file, answerData, questionId) => {
    try {
        const formData = new FormData();
        formData.append(
            'answer',
            new Blob([JSON.stringify(answerData)], {
                type: 'application/json',
            }),
        );

        if (file) {
            formData.append('files', file);
        }

        const response = await axiosInstance({
            method: 'post',
            url: `/answers/managers/${questionId}`,
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
        console.error('답변 등록 API ERROR: ', error.message || error);
        throw error;
    }
};

// 답변 수정
export const putAnswerByQuestionId = async (file, answerData, questionId) => {
    try {
        const formData = new FormData();
        formData.append(
            'answer',
            new Blob([JSON.stringify(answerData)], {
                type: 'application/json',
            }),
        );

        if (file) {
            formData.append('files', file);
        }

        const response = await axiosInstance({
            method: 'put',
            url: `answers/managers/${questionId}`,
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
        console.error('답변 수정 API ERROR: ', error.message || error);
        throw error;
    }
};
