import express from 'express';
import userControll from '../controller/user.controll';
import tagControll from '../controller/tags.controll';

let router = express.Router({
  mergeParams: true
});
router.get('/list', function (req, res, next) {
  res.status(200);
  res.send(JSON.stringify({
    'timeData': 'aaaaaaa',
    'errorMsg': 'ddddd'
  }))
})
/**
 * 用户注册
 */
router.post('/register', userControll.Register);
/**
 * 用户登录
 */
router.post('/login', userControll.Login);
/**
 * 退出登陆
 */
router.post('/logout', userControll.Logout);
/**
 * 用户验证
 */
router.get('/userInfo', userControll.userInfo);
/**
 * 添加标签
 */
router.post('/addTag', tagControll.addTag);
/**
 * 查询标签列表
 */
router.get('/tagList', tagControll.tagList);
/**
 * 删除标签
 */
router.delete('/delTag', tagControll.delTag);

module.exports = router;