import axios from 'axios';

import { TOKEN } from '@/constants/common';
import { LOGIN_URL } from '@/constants/url';

const api = axios.create({
    baseURL: 'http://localhost:8080/',
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(TOKEN);
        if (!accessToken) {
            return config;
        } else {
            config.headers['Content-Type'] = 'application/json; charset=utf-8';
            config.headers['Authorization'] = accessToken;
            return config;
        }
    },
    (error) => {
        localStorage.removeItem(TOKEN);
        alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
        window.open(LOGIN_URL);
    },
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error?.response?.status === 400 &&
            error?.response?.data.details === 'Token is missing'
        ) {
            localStorage.removeItem(TOKEN);
            alert('세션이 만료되었습니다. 다시 로그인해 주시기 바랍니다.');
            window.open(LOGIN_URL);
        } else {
            return Promise.reject(error);
        }
    },
);
export default api;
