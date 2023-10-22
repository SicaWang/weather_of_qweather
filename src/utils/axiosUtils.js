import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://devapi.qweather.com', // 和风天气api
    timeout: 5000
});

// 请求拦截器，可以在此处理请求前的逻辑
axiosInstance.interceptors.request.use(
    (config) => {
        // config.params.lang = 'en'
        if(config.method === 'get' && !config.params.key){
            config.params.key = import.meta.env.VITE_API_BASE_KEY
        }
        // 在请求发送之前可以添加一些逻辑，如果有需要的话
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器，可以在此处理错误响应
axiosInstance.interceptors.response.use(
(response) => {
    // 在请求成功时，你可以在此添加一些逻辑
    if(response.data.code === '200'){
        return response.data
    }
    return response;
},
(error) => {
    // 在请求失败时，你可以在此添加错误处理逻辑
    console.error('请求失败', error);
    return Promise.reject(error);
}
);

export default axiosInstance;