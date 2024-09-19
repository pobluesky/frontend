import axiosInstance from '../utils/axiosInstance';
import { createFormQualityData } from '../utils/inquiryUtils';

// 1차 검토(review) & 품질 검토(quality) & offerSheet

// 1차 검토 조회
export const getReviews = async (inquiryId) => {
    try {
        const response = await axiosInstance.get(`/reviews/${inquiryId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 1차 검토 등록
export const postReview = async (inquiryId, reviewData) => {
    try {
        const response = await axiosInstance.post(`/reviews/${inquiryId}`, reviewData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error creating Review:', error);
        throw error;
    }
};

// 최종 검토 수정(등록)
export const putReview = async (inquiryId, reviewData) => {
    try {
        const response = await axiosInstance.put(`/reviews/${inquiryId}`, reviewData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error updating Review:', error);
        throw error;
    }
};

// 품질 검토 조회
export const getQualities = async (inquiryId) => {
    try {
        const response = await axiosInstance.get(`/qualities/${inquiryId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 품질 검토 등록
export const postQuality = async (inquiryId, qualityData) => {
    try {
        const formData = createFormQualityData(qualityData);
        const response = await axiosInstance.post(
            `/qualities/${inquiryId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        console.log('postQualityResponse: ', response);
        return response.data;
    } catch (error) {
        console.log('Error creating Quality:', error);
        throw error;
    }
};

// 오퍼시트 조회
export const getOfferSheets = async (inquiryId) => {
    try {
        const response = await axiosInstance.get(`/offersheet/${inquiryId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// 오퍼시트 등록
export const postOfferSheet = async (inquiryId, offerSheetData) => {
    try {
        const response = await axiosInstance.post(
            `/offersheet/${inquiryId}`,
            offerSheetData,
        );
        console.log('postOfferSheetResponse: ', response);
        return response.data;
    } catch (error) {
        console.log('Error posting offer sheet:', error);
        throw error;
    }
};
