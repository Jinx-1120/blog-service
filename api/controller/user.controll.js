import UserModel from '../models/users.model';
import { responseClient, md5, MD5_SUFFIXSTR } from '../util';
/**
 * 注册
 * @param {*} req  request
 * @param {*} res  response
 * @param {*} next next()
 */
exports.Register = async (req, res, next) => {
  let {
    userName,
    passWord,
    type
  } = req.body;
  if (!userName) {
    responseClient(res, 400, 2, '用户名不为空')
  } else if (!passWord) {
    responseClient(res, 400, 2, '密码不可为空')
  }
  UserModel.findOne({
    userName: userName
  }).then(data => {
    if (data) {
      responseClient(res, 200, 1, '用户名已存在');
      next();
    }
    let user = new UserModel({
      userName: userName,
      passWord: md5(passWord + MD5_SUFFIXSTR),
      type: type
    });
    user.save().then(() => {
      UserModel.findOne({
        userName: userName
      }).then(userInfo => {
        let data = {
          userName: userInfo.userName,
          userType: userInfo.type,
          userId: userInfo._id
        }
        responseClient(res, 200, 0, '注册成功', data);
        next();
      })
    }).catch(err => {
      responseClient(res, 500, 1, '注册失败,请重新注册', err);
      next();
    });
  });
};
/**
 * 登陆
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.Login = async (req, res, next) => {
  let { userName, passWord } = req.body;
  UserModel.findOne({
    userName,
    passWord: md5(passWord + MD5_SUFFIXSTR)
  }).then(userInfo => {
    if (userInfo) {
      let data = {};
      data.userName = userInfo.userName;
      data.userType = userInfo.type;
      data.userId = userInfo._id;
      // 设置登陆成功cookie
      // res.cookie("user", userInfo._id, {
      //   maxAge: 9000000,
      //   httpOnly: false
      // });
      req.session.userInfo = data;

      responseClient(res, 200, 0, '登陆成功', data);
      next();
    } else {
      responseClient(res, 400, 1, '用户名与密码不匹配');
      next();
    };
  }).catch(err => {
    responseClient(res, 500, 1, '服务器异常，请稍后再试', err);
    next();
  });
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.Logout = async (req, res, next) => {
  try {
    if (req.body.userName === req.session.userInfo.userName) {
      req.session.userInfo = null;
      responseClient(res, 200, 0, '退出成功', req.session.userInfo)
      next();
    } else {
      req.session.userInfo = null;
      responseClient(res, 200, 0, '退出成功', req.session.userInfo)
      next();
    }
  } catch (err) {
    responseClient(res, 400, 1, '退出失败', err);
    next();
  }
}

exports.userInfo = async (req, res, next) => {
  try {
    if (req.query.userName === req.session.userInfo.userName) {
      responseClient(res, 200, 0, '验证成功', req.session.userInfo);
      next();
    } else {
      responseClient(res, 400, 1, '登陆超时，请重新登陆', req.session.userInfo);
      next();
    }
  } catch (err) {
    responseClient(res, 400, 1, '登陆超时，请重新登陆', err);
    next();
  }
}