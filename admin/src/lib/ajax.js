import axios from 'axios';
import {Loading, Message} from 'element-ui';
import _ from 'lodash';
import router from '../router/index';
// import Vue from 'vue';
// Vue.component(Message);
// Vue.component(Loading);
// axios 配置
const ajaxconfig = {
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.jinhaidi.cn/admin/' : '/admin/',
  timeout: 5000,
  isRetryRequest: false
}
// let loadinginstace = Loading.service({
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.5)'
// });
axios.interceptors.request.use(function (config) {
  // 在发送请求显示加载动画
  // loadinginstace
  return config;
}, function (error) {
  // 取消加载动画 并提示消息
  loadinginstace.close();
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error);
});
let instance = axios.create(ajaxconfig);


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
