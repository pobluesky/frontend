import axiosInstance from '../utils/axiosInstance';

// chatbot 질문 및 응답을 받는 함수
export const postChatbot = async (messages) => {
    try {
        const response = await axiosInstance.post(`/chat/send`, messages);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error creating Chatbot Response:', error);
        throw error;
    }
};