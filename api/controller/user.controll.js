import UserModel from '../models/users.model';
import { responseClient, md5, MD5_SUFFIXSTR } from '../util';

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
      return;
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
        return;
      })
    }).catch(err => {
      responseClient(res, 500, 1, '注册失败,请重新注册', err);
      return;
    });
  });
};
exports.Login = async (req, res, next) => {
  let { userName, passWord } = req.body;
  UserModel.findOne({
    userName,
    passWord: md5(passWord + MD5_SUFFIXSTR)
  }).then(userInfo => {
    console.log(userInfo);
    if (userInfo) {
      let data = {};
      data.userName = userInfo.userName;
      data.userType = userInfo.type;
      data.userId = userInfo._id;
      // 设置登陆成功cookie
      res.cookie("user", userInfo._id, {
        maxAge: 9000000,
        httpOnly: false
      });
      responseClient(res, 200, 0, '登陆成功', data);
      return;
    } else {
      responseClient(res, 400, 1, '用户名与密码不匹配');
    };
  }).catch(err => {
    console.log(err);
    responseClient(res, 500, 1, '服务器异常，请稍后再试', err);
    return;
  })
}