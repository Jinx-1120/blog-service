import express from 'express';
import userControll from '../controller/user.controll';
import tagControll from '../controller/tags.controll';
import articleControll from '../controller/article.controll';
import uploadControll from '../controller/upload.controll';
import commentControll from '../controller/comment.controll';

let clientRouter = express.Router({
  mergeParams: true
});

/**
 * 用户验证
 */
clientRouter.get('/userInfo', userControll.userInfo);

/**
 * 查询标签列表
 */
clientRouter.get('/tagList', tagControll.tagList);
/**
 * 获取文章列表
 */
clientRouter.get('/articleList', articleControll.articleList);
/**
 * 获取文章详情
 */
clientRouter.get('/article/:articleID', articleControll.getArticle);
/**
 * 点赞
 */
clientRouter.post('/article/likeArticle/:articleID', articleControll.likeArticle);

/**
 * 搜索
 */
clientRouter.get('/search', articleControll.searchArticle);

// uploadControll.upload.single('file')
// clientRouter.post('/uploadImg', uploadControll.upload.single('image'), uploadControll.uploadImg);

/***
 * 评论
 */
clientRouter.get('/comments', commentControll.getComments);

clientRouter.post('/comment', commentControll.postComment);

/**
 * 归档
 */
clientRouter.get('/getrecords', articleControll.getRecords);

module.exports = clientRouter;
