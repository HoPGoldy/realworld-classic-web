import axios from 'axios';

const api = axios.create({
    baseURL: 'https://conduit.productionready.io/api/'
});

export default api;