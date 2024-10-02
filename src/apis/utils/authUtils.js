import axiosInstance from '../utils/axiosInstance';
import { setCookie } from './cookies';

const signInApi = async (endpoint, credentials) => {
    try {
        const response = await axiosInstance.post(endpoint, credentials,{
            timeout: 100000, // 100초 동안 요청 대기
        });

        if (response.status === 200) {
            const { accessToken, refreshToken, userRole, userId } =
                response.data;

            // AccessToken과 RefreshToken을 쿠키에 저장
            setCookie('accessToken', accessToken, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7일 동안 유효
            });

            setCookie('refreshToken', refreshToken, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60,
            });

            setCookie('userRole', userRole.toLowerCase(), {
                path: '/',
                maxAge: 7 * 24 * 60 * 60,
            });

            setCookie('userId', userId, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60,
            });

            return {
                success: true,
                data: response.data,
            };
        } else {
            return { success: false, message: 'Login failed' };
        }
    } catch (error) {
        console.error('로그인 API ERROR: ', error.message || error);
        throw error;
    }
};

const signUpApi = async (endpoint, userInfo) => {
    try {
        const response = await axiosInstance.post(endpoint, userInfo);

        const json = response.data;

        if (json.result !== 'success') {
            throw new Error(json.message);
        }

        return json;
    } catch (error) {
        console.error('회원가입 API ERROR: ', error.message || error);
        throw error;
    }
};

const getUserInfoApi = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);

        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            };
        } else {
            return { success: false, message: 'Get user info failed' };
        }
    } catch (error) {
        console.log('사용자 정보 조회 API ERROR: ', error);
        return { success: false, message: error.toString() };
    }
};

const findNameByEmail = async (email, endpoint) => {
    const result = await getUserInfoApi(endpoint);

    if (result.success) {
        const user = result.data.data.find((user) => user.email === email);
        return user ? user.name : 'Name not found';
    } else {
        return 'Error fetching data';
    }
};

export { signInApi, signUpApi, getUserInfoApi, findNameByEmail };
