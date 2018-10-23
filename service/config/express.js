import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mutipart from 'connect-multiparty';

import adminRouter from '../api/route/admin';
import clientRouter from '../api/route/client';
import { logs } from './config';
import { responseClient } from '../api/util';

const app = new express();

// var allowCrossDomain = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*'); //自定义中间件，设置跨域需要的响应头。
//   next();
// };
// app.use(allowCrossDomain); //运用跨域的中间件



// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

// dev 显示console | pro 显示: file
app.use(morgan(logs));

app.use(express.static('public'));
// json
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(mutipart({uploadDir: '../upload_tmp'}));
// 设置全局session
// app.use(cookieParser('express_cookie'));
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
  },
}));

// 设置全局登陆验证
app.use((req, res, next) => {
  if(req.originalUrl.indexOf('/admin/') === 0) {
    if (req.session.userInfo) {
      next();
    } else {
      if (req.originalUrl.indexOf('login') > 0 || req.originalUrl.indexOf('register') > 0 ) {
        next();
      } else {
        responseClient(res, 200, -1, '登陆超时，请重新登陆', req.session.userInfo);
      }
    }
  } else {
    next();
  }
})

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());


// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
// passport.use('jwt', strategies.jwt);

// mount api /api routes
app.use('/admin', adminRouter);

app.use('/client', clientRouter);

module.exports = app;
