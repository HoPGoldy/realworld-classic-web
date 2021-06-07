import axios from 'axios';
import history from './router';

export const setToken = newToken => {
    if (!newToken) delete axios.defaults.headers.common.authorization;
    else axios.defaults.headers.common.authorization = `Token ${newToken}`;
}

axios.defaults.baseURL = 'https://conduit.productionready.io/api/';

axios.interceptors.response.use(
    resp => resp.data,
    error => {
        if (error.response.status === 401) {
            history.push('/login');
            setToken(undefined);
            localStorage.removeItem('token');
        }
        else if (error.response.status === 404) {
            history.push('/home');
        }

        throw error;
    }
);

export default axios;