import articleModel from '../models/article.model';
import { responseClient } from '../util';
/**
 * 添加文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.addArticle = async (req, res, next) => {
  let {
    title,
    tags,
    content,
    coverImg,
    status
  } = req.body;
  try {
    let article = new articleModel({
      title,
      tags,
      content,
      coverImg,
      author: req.session.userInfo.userName,
      status,
      createTime: new Date(),
      viewCount: 0,
      reviewArea: []
    })
    article.save().then(data => {
      responseClient(res, 200, 201, '保存成功！');
      next();
    }).catch(err => {
      responseClient(res, 500, 500, '系统异常！', err);
      next();
    })
  } catch (err) {
    responseClient(res, 200, 1, '保存失败！', err);
    next();
  };
};
/**
 * 文章列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.articleList = async (req, res, next) => {
  try {
    articleModel.count({}, (errmsg, num) => {
      let { pageNum = 1, tag } = req.query;
      let articles = articleModel.find({}).limit(10).skip((pageNum - 1) * 10);
      let pageTotal;
      let data = {};
      pageTotal = Math.ceil(num / 10);
      let more = pageTotal - pageNum > 0 ? true : false;
      articles.exec((err, result) => {
        data.data = result;
        data.pageTotal = pageTotal;
        data.more = more;
        data.totalNum = num;
        responseClient(res, 200, 200, errmsg, data);
      })
    })
  } catch (err) {
    next(err);
  }
};
/**
 * 获取文章详情
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getArticle = async (req, res, next) => {
  let { articleID } = req.params;
  articleModel.findOne({
    _id: articleID
  }).then(info => {
    let viewCount = info.viewCount + 1;
    articleModel.update({
      _id: articleID
    }, { viewCount }).then(result => {
      console.log(result);
    });
    responseClient(res, 200, 200, '', info);
    next();
  }).catch(err => {
    responseClient(res, 200, 202, '查询失败', err);
    next();
  });
};
/**
 * 文章更新
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateArticle = async (req, res, next) => {
  let { articleID } = req.params;
  console.log(req.body);
  let {
    title,
    tags,
    content,
    coverImg,
    status
  } = req.body;
  let updateTime = new Date();
  articleModel.update({
    _id: articleID
  }, {
    title,
    tags,
    content,
    coverImg,
    status,
    updateTime
  }).then(updateInfo => {
    responseClient(res, 200, 201, '更新成功!', updateInfo);
  }).catch(err => {
    responseClient(res, 500, 202, '更新失败！', err)
  })
};

/**
 * 删除文章
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.delArticle = async (req, res, next) => {
  console.log(req.params);
  let { articleID } = req.params;
  try {
    if (!articleID) {
      responseClient(res, 200, 202, '请输入正确的ID');
      next();
    } else {
      articleModel.remove({
        _id: articleID
      }).then(result => {
        if (result.n === 1) {
          responseClient(res, 200, 201, '删除成功!')
        } else {
          responseClient(res, 200, 202, '文章不存在！!')
        }
      }).catch(err => {
        responseClient(res, 500, 500, '服务器异常', err)
      })
    }
  } catch (err) {
    responseClient(res, 500, 500, '服务器异常', err)
  };
};
