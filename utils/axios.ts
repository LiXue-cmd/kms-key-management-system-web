// utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // 设置基础 URL
  timeout: 5000 // 设置超时时间
});

export default instance;