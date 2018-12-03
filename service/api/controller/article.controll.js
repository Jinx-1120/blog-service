import articleModel from '../models/article.model';
import { responseClient } from '../util';
import request from 'request';
import config from '../../config/config';
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
    status,
    description
  } = req.body;
  try {
    let article = new articleModel({
      title,
      tags,
      content,
      description,
      coverImg,
      author: req.session.userName,
      status,
      createTime: new Date(),
      viewCount: 0,
      reviewArea: [],
      fabulous: 0
    })
    article.save().then(data => {
      responseClient(res, 200, 201, '保存成功！');
      request.post({
        url: `http://data.zz.baidu.com/urls?site=${config.baidu.site}&token=${config.baidu.token}`,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: `${config.baidu.site}/article/${data._id}`
      }, (error, response, body) => {
          console.log('推送结果：', body)
      })
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
  let userName = ''
  req.originalUrl.indexOf('/admin/') === 0 ? userName = req.session.userName : userName = 'admin'
  let {
    pageNum = 1, tag, isAll = false, hot = false
  } = req.query;
  let option = {
    author: userName
  };
  let sort = {};
  tag ? option.tags = tag : '';
  hot ? sort = {
    fabulous: -1
  } : sort = {
    createTime: 1
  }
  let articleList = await articleModel.paginate(option, {
    sort,
    page: pageNum
  }).catch(err => responseClient(res, 500, 202, '服务器内部错误！', err))
  let data = {
    data: articleList.docs,
    pageTotal: articleList.pages,
    more: articleList.pages - articleList.page > 1 ? true : false,
    totalNum: articleList.page
  };
  responseClient(res, 200, 200, 'success', data);
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
  let {
    title,
    tags,
    description,
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
    description,
    coverImg,
    status,
    updateTime
  }).then(updateInfo => {
    responseClient(res, 200, 201, '更新成功!', updateInfo);
    request.post({
      url: `http://data.zz.baidu.com/update?site=${config.baidu.site}&token=${config.baidu.token}`,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: `${config.baidu.site}/article/${articleID}`
    }, (error, response, body) => {
      console.log('百度更新结果：', body)
    })
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
          responseClient(res, 200, 201, '删除成功!');
          request.post({
            url: `http://data.zz.baidu.com/del?site=${config.baidu.site}&token=${config.baidu.token}`,
            headers: {
              'Content-Type': 'text/plain'
            },
            body: `${config.baidu.site}/article/${articleID}`
          }, (error, response, body) => {
            console.log('百度删除结果：', body)
          })
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

/**
 * 喜欢art
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.likeArticle = async (req, res, next) => {
  let {
    articleID
  } = req.params;
  try {
    if (!articleID) {
      responseClient(res, 200, 202, '请输入正确的ID');
      next();
    } else {
      articleModel.findOne({
        _id: articleID
      }).then(result => {
        let fabulous = result.fabulous + 1 || 1;
        articleModel.update({
          _id: articleID
        },{ fabulous }).then(info => {
          responseClient(res, 200, 200, '成功', info);
          next();
        }).catch(err => {
          responseClient(res, 500, 500, '服务器异常', err)
        })
      }).catch(err => {
        responseClient(res, 500, 500, '服务器异常', err)
      })
    }
  } catch (err) {
    responseClient(res, 500, 500, '服务器异常', err)
  };
}

/**
 * search
 * 搜索
 */

exports.searchArticle = async (req, res, next)=> {
  const {
    keyword
  } = req.query;
  const keywordReg = new RegExp(keyword);
  const query = {};
  query.$or = [
    {title: {$regex: keyword, $options: '$i'}},
    {description: {$regex: keyword, $options: '$i'}}, //  $options: '$i' 忽略大小写
    {content: {$regex: keyword, $options: '$i'}}
  ];

  articleModel.find(query).then(info => {
    responseClient(res, 200, 200, '成功', info);
    next();
  }).catch(err => {
    responseClient(res, 500, 500, '服务器异常', err);
    next();
  })
}
