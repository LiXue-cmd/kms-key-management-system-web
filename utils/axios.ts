// utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // 设置基础 URL
  timeout: 10000 // 设置超时时间为 10 秒
});
// 检查请求拦截器
axios.interceptors.request.use(config => {
  console.log('Request headers:', config.headers);
  return config;
});

// 检查响应拦截器
axios.interceptors.response.use(response => {
  console.log('Response headers:', response.headers);
  return response;
});

export default instance;