import axios from 'axios';
import BASE_URL from '../config/constants';
import { getCookie, removeCookie, setCookie } from './cookies';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            config.headers.Authorization = `${accessToken}`;
        }
        // console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    // 응답이 성공적일 때
    (response) => {
        return response;
    },

    // 토큰이 유효하지 않을 경우
    async (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
            try {
                const refreshToken = getCookie('refreshToken');
                if (!refreshToken) {
                    removeCookie('accessToken', { path: '/' });
                    removeCookie('userName', { path: '/' });
                    removeCookie('userRole', { path: '/' });
                    removeCookie('userId', { path: '/' });
                    window.location.href = '/';
                    return Promise.reject(error);
                }

                const refreshResponse = await axios.post(
                    '/users/sign-in',
                    null,
                    {
                        params: {
                            accountId: '1', // 필요에 따라 조정
                            token: refreshToken,
                        },
                        headers: {
                            Authorization: `${refreshToken}`,
                        },
                    },
                );

                const newAccessToken = refreshResponse.data.result.accessToken;
                setCookie('accessToken', newAccessToken, {
                    path: '/',
                });
                setCookie(
                    'refreshToken',
                    refreshResponse.data.result.refreshToken,
                    {
                        path: '/',
                    },
                );

                error.config.headers.Authorization = `${newAccessToken}`;

                const newRole = refreshResponse.data.result.userRole;

                const updatedResponse = await axios(error.config);

                return { ...updatedResponse, userRole: newRole };
            } catch (err) {
                removeCookie('accessToken', { path: '/' });
                removeCookie('refreshToken', { path: '/' });
                removeCookie('userName', { path: '/' });
                removeCookie('userRole', { path: '/' });
                removeCookie('userId', { path: '/' });
                window.location.href = '/';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
