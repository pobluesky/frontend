import axiosInstance from '../utils/axiosInstance';

// 파일 다운로드 URL 가져오기
export const getFileDownloadUrl = async (objectKey) => {
    try {
        const response = await axiosInstance.get('/upload/download', {
            params: { objectKey },
        });

        return response.data; // 서명된 URL 반환
    } catch (error) {
        console.error('파일 다운로드 URL 생성 오류: ', error.message || error);
        throw error;
    }
};
