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
    responseClient(res, 200, 202, '用户名不为空')
  } else if (!passWord) {
    responseClient(res, 200, 202, '密码不可为空')
  }
  UserModel.findOne({
    userName: userName
  }).then(data => {
    if (data) {
      responseClient(res, 200, 202, '用户名已存在');
      next();
    }
    let user = new UserModel({
      userName: userName,
      passWord: md5(passWord + MD5_SUFFIXSTR),
      type: type,
      headImg: '',
      description: '',
      likes: [],
      friends: [],
      name: '',
      link: []
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
        responseClient(res, 200, 201, '注册成功', data);
        next();
      })
    }).catch(err => {
      responseClient(res, 500, 202, '注册失败,请重新注册', err);
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
      console.log(req.session.userInfo);

      responseClient(res, 200, 200, '登陆成功', data);
      next();
    } else {
      responseClient(res, 200, 202, '用户名与密码不匹配');
      next();
    };
  }).catch(err => {
    responseClient(res, 500, 500, '服务器异常，请稍后再试', err);
    next();
  });
};
/**
 *  退出登陆
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.Logout = async (req, res, next) => {
  try {
    req.session.userInfo = null;
      responseClient(res, 200, 201, '退出成功', req.session.userInfo)
      next();
  } catch (err) {
    responseClient(res, 400, 500, '退出失败', err);
    next();
  }
}

exports.userInfo = async (req, res, next) => {
  console.log(req.session.userInfo);

  let userName = req.session.userInfo.userName
  if (userName) {
    UserModel.findOne({
      userName
    }).then(userInfo => {
      userInfo.passWord = ''
      responseClient(res, 200, 200, 'success', userInfo);
      next();
    }).catch(err => {
      responseClient(res, 400, 500, 'error', err);
      next();
    })
  } else {
    responseClient(res, 200, -1, '登陆超时，请重新登陆', req.session.userInfo);
    next();
  }
}
exports.updateInfo = async (req, res, next) => {
  let {
    userName,
    headImg,
    description,
    likes,
    friends,
    name,
    link
  } = req.body;
  UserModel.update({
    userName: userName
  }, {
    userName,
    headImg,
    description,
    likes,
    friends,
    name,
    link
  }).then(updateInfo => {
    responseClient(res, 200, 201, '更新成功!', updateInfo);
  }).catch(err => {
    responseClient(res, 500, 202, '更新失败！', err)
  })
}
