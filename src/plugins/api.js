import axios from 'axios';
import history from './history';
import { useRequest as useAhooksRequest } from 'ahooks';

/**
 * 设置请求中携带的用户 token
 */
export const setToken = newToken => {
    if (!newToken) delete axios.defaults.headers.common.authorization;
    else axios.defaults.headers.common.authorization = `Token ${newToken}`;
}

// 后端地址
axios.defaults.baseURL = 'https://api.realworld.io/api';

axios.interceptors.response.use(
    resp => resp.data,
    error => {
        // 点击需要登录的操作后跳转到登录页
        if (error.response.status === 401) {
            history.push('/login');
            setToken(undefined);
            localStorage.removeItem('token');
        }
        // 未知请求就跳转回首页
        else if (error.response.status === 404) {
            history.push('/home');
        }

        throw error;
    }
);

// 使用 axios 作为请求方法
export const useRequest = function (service, options) {
    return useAhooksRequest(service, {
        ...options,
        requestMethod: params => axios(params),
    });
}

export default axios;