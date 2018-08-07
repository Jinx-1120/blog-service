import express from 'express';
import userControll from '../controller/user.controll';
import tagControll from '../controller/tags.controll';
import articleControll from '../controller/article.controll';
import uploadControll from '../controller/upload.controll';


let router = express.Router({
  mergeParams: true
});
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
/**
 * 添加文章
 */
router.post('/addArticle', articleControll.addArticle);
/**
 * 获取文章列表
 */
router.get('/articleList', articleControll.articleList);
/**
 * 获取文章详情
 */
router.get('/article/:articleID', articleControll.getArticle);

router.put('/article/:articleID', articleControll.updateArticle);
/**
 * 删除文章
 */
router.delete('/delArticle/:articleID', articleControll.delArticle);

// uploadControll.upload.single('file')
router.post('/uploadImg', uploadControll.upload.single('file'), uploadControll.uploadImg);
module.exports = router;