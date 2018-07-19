import mongoose from 'mongoose';

/**
 * 用户User表结构
 * @param {String} userName 用户名称
 * @param {String} passWord 用户密码
 * @param {Boolean} type 用户类型  true为管理员，flase为普通用户
 */

const User = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    match: /^[.a-zA-Z]+$/,
    max: 18,
    min: 3
  },
  passWord: {
    type: String,
    required: true,
    max: 20,
    min: 6,
    trim: true
  },
  type: {
    type: Boolean
  }
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;

