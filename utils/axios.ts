// utils/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // 设置基础 URL
  timeout: 10000 // 设置超时时间为 10 秒
});

export default instance;