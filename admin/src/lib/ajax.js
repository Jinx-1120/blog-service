import axios from 'axios';
import {Loading, Message} from 'element-ui';
import _ from 'lodash';
import router from '../router/index';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api/';
//用来处理刷新token后重新请求的自定义变量
axios.defaults.isRetryRequest = false;
let loadinginstace;
axios.interceptors.request.use(function (config) {
  // 在发送请求显示加载动画
  loadinginstace = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.5)'
  });
  return config;
}, function (error) {
  // 取消加载动画 并提示消息
  loadinginstace.close();
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error);
});
axios.interceptors.response.use(config => {
  // 取消加载动画 并判断当前是否是登陆过期情况，为登陆过期，跳转到登陆页
  loadinginstace.close();
  if (config.data.code === -1) {
    router.replace('/login');
  } else {
    return config;
  };
});

export default {
  install(Vue) {
    Vue.prototype.http = axios
    Vue.http = axios
  }
};