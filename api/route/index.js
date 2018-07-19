import express from 'express';
import userControll from '../controller/user.controll';

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


module.exports = router;