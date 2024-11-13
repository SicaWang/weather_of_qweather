import axios from 'axios';
import generateJWT from './jwtUtils'; // 根据实际文件名和路径导入 generateJWT

// 环境变量读取
const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://devapi.qweather.com';
const apiKey = import.meta.env.VITE_API_BASE_KEY;
const privateKey = import.meta.env.VITE_API_PRIVATE_KEY;
const projectId = import.meta.env.VITE_API_PROJECT_ID;
const kid = import.meta.env.VITE_API_KID;

// 创建Axios实例
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000
});

// 请求拦截器
// 请求拦截器
axiosInstance.interceptors.request.use(
    async (config) => {
        if (privateKey) {
            // 检查是否同时设置了 VITE_API_PROJECT_ID 和 VITE_API_KID
            if (!projectId || !kid) {
                throw new Error('使用JWT认证时，必须设置 VITE_API_PROJECT_ID 和 VITE_API_KID。');
            }
            // 使用JWT作为认证方式
            const token = await generateJWT();  // 等待JWT生成
            config.headers['Authorization'] = `Bearer ${token}`;
        } else if (apiKey) {
            // 使用API密钥作为认证方式
            if (config.method === 'get' && !config.params.key) {
                config.params = config.params || {};
                config.params.key = apiKey;
            }
        } else {
            // 抛出错误：未设置API密钥或私钥
            throw new Error('未找到有效的认证方式：请设置 VITE_API_PRIVATE_KEY 或 VITE_API_BASE_KEY。');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            const responseData = response.data;
            if (responseData.code !== '200') {
                console.warn(`请求失败，错误代码：${responseData.code}`);
                return null; // 返回 null 而不是抛出错误
            }
            return responseData;
        }
        return response;
    },
    (error) => {
        console.error('请求失败', error);
        return null; // 返回 null，避免阻断后续流程
    }
);



export default axiosInstance;
