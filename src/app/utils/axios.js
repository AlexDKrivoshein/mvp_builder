import BaseAxios from 'axios';

const axios = BaseAxios.create({
    //baseURL: `${window.location.hostname === 'localhost' ? 'https://upay.4us.su' : window.location.origin}/api_v2/`,
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 300000,
    //withCredentials: true,
});

export default axios;