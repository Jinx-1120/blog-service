import axios from 'axios';
import {Loading, Message} from 'element-ui';
import _ from 'lodash';
import router from '../router/index';
import {
  getToken
} from './util';

// import Vue from 'vue';
// Vue.component(Message);
// Vue.component(Loading);
// axios 配置
const ajaxconfig = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.jinhaidi.cn/admin/' : 'http://localhost:3000/admin/',
  timeout: 5000,
  isRetryRequest: false
}
let instance = axios.create(ajaxconfig);

instance.interceptors.request.use(function (config) {
  // 在发送请求显示加载动画
  // loadinginstace
  config.params = {
    'token': getToken()
  }
  if(config.url.indexOf('getQN') > 0) {
    config.params = {}
  }
  console.log(config.url.indexOf('getQN'))
  return config;
}, function (error) {
  // 取消加载动画 并提示消息
  loadinginstace.close();
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error);
});


export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        http(params) {
          let myPromise = instance(params).then(info => {
            const code = info.data.code;
            // loadinginstace.close();

            switch (code) {
              case -1:
                // console.log(code === -1);
                this.$message({
                  message: info.data.message,
                  type: 'warning'
                });
                router.replace('/login');
                break;
              case 201:
                this.$message({
                  message: info.data.message,
                  type: 'success'
                });
                break;
              case 202:
                this.$message({
                  message: info.data.message,
                  type: 'warning'
                });
                break;
              case 500:
                this.$message({
                  message: info.data.message,
                  type: 'error'
                });
                break;
              default:
                break;
            }
            return info.data;
          }).catch(err => {
            router.replace('/404');
          })
          return myPromise
        }
      }
    })
  }
};
