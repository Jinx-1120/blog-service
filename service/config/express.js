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

import routes from '../api/route';
import { logs } from './config';

const app = new express();

// dev 显示console | pro 显示: file
app.use(morgan(logs));

// json
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser('express_cookie'));
app.use(session({
  secret: 'express_cookie',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 * 30
  } //过期时间
}));

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

// mount api v1 routes
app.use('/api', routes);

// if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// catch 404 and forward to error handler
// app.use(error.notFound);

// error handler, send stacktrace only during development
// app.use(error.handler);

module.exports = app;