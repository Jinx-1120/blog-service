/*
 *
 * 评论控制器
 *
 */

const { responseClient } = require('../../util/util')
const { sendMail } = require('../../util/email')
const Comment = require('../models/comment.model')
const Article = require('../models/article.model')
const geoip = require('geoip-lite')

// 更新当前所受影响的文章的评论聚合数据
const updateArticleCommentCount = (post_ids = []) => {
  post_ids = [...new Set(post_ids)].filter(id => !!id)
  if (post_ids.length) {
    Comment.aggregate([{
          $match: {
            state: 1,
            post_id: {
              $in: post_ids
            }
          }
        },
        {
          $group: {
            _id: "$post_id",
            num_tutorial: {
              $sum: 1
            }
          }
        }
      ])
      .then(counts => {
        if (counts.length === 0) {
          Article.update({
              id: post_ids[0]
            }, {
              $set: {
                'reviewArea': 0
              }
            })
            .then(info => {})
            .catch(err => {})
        } else {
          counts.forEach(count => {
            Article.update({
                id: count._id
              }, {
                $set: {
                  'reviewArea': count.num_tutorial
                }
              })
              .then(info => {
                console.log('评论聚合更新成功', info);
              })
              .catch(err => {
                console.warn('评论聚合更新失败', err);
              });
          });
        }
      })
      .catch(err => {
        console.warn('更新评论count聚合数据前，查询失败', err);
      })
  }
};

// 邮件通知网站主及目标对象
const sendMailToAdminAndTargetUser = (comment, permalink) => {
  sendMail({
    to: 'haidi_jin@163.com',
    subject: '博客有新的留言',
    text: `来自 ${comment.author.name} 的留言：${comment.content}`,
    html: `<p> 来自 ${comment.author.name} 的留言：${comment.content}</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`
  });
  if (!!comment.pid) {
    Comment.findOne({
      id: comment.pid
    }).then(parentComment => {
      sendMail({
        to: parentComment.author.email,
        subject: '你的blog有新的评论回复',
        text: `来自 ${comment.author.name} 的评论回复：${comment.content}`,
        html: `<p> 来自${comment.author.name} 的评论回复：${comment.content}</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`
      })
    })
  }
}

exports.getComments = async (req, res, next) => {
    let {
      sort = -1, current_page = 1, page_size = 20, keyword = '', post_id, state
    } = req.query

    sort = Number(sort)

    // 过滤条件
    const options = {
      sort: {
        'create_at': -1
      },
      page: Number(current_page),
      limit: Number(page_size)
    }

    // 排序字段
    if ([1, -1].includes(sort)) {
      options.sort = {
        'create_at': -1
      }
    } else if (Object.is(sort, 2)) {
      options.sort = {
        likes: -1
      }
    };

    // 查询参数
    let querys = {}

    // 查询各种状态
    if (state && ['0', '1', '2'].includes(state)) {
      querys.state = state;
    };

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      querys['$or'] = [{
          'content': keywordReg
        },
        {
          'author.name': keywordReg
        },
        {
          'author.email': keywordReg
        }
      ]
    }

    // 通过post-id过滤
    if (!Object.is(post_id, undefined)) {
      querys.post_id = post_id
    }

    // 请求评论
    console.log(options.sort)
    const comments = await Comment
      .paginate(querys, options)
      .catch(err =>{
        responseClient(res, 500, 202, '服务器内部异常', err)
      })
    if (comments) {
      responseClient(res, 200, 200, '评论列表获取成功', {
        pagination: {
          total: comments.total,
          current_page: options.page,
          total_page: comments.pages,
          per_page: options.limit
        },
        data: comments.docs
      })
    } else responseClient(res, 200, 202, '评论列表获取失败', '')
}

exports.postComment = async (req, res, next) => {
  let comment = req.body
  // 获取ip地址以及物理地理地址
  const ip = (req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.ip ||
    req.ips[0]).replace('::ffff:', '');
  comment.ip = ip
  comment.agent = req.headers['user-agent'] || comment.agent

  const ip_location = geoip.lookup(ip)

  if (ip_location) {
    comment.city = ip_location.city,
    comment.range = ip_location.range,
    comment.country = ip_location.country
  }

  comment.likes = 0
  comment.author = JSON.parse(comment.author)

  let permalink
  if (Number(comment.post_id) !== 0) {
    // 永久链接
    const article = await Article
      .findOne({
        '_id': comment.post_id
      })
      .catch(err => responseClient(res, 500, 202, '服务器内部异常', err))
    permalink = `http://localhost:3001/article/${article._id}`
  } else permalink = 'https://jinhaidi.cn/about'

  // 发布评论
  const result = await new Comment(comment)
    .save()
    .catch(err => responseClient(res, 500, 202, '服务器内部异常', err))
  if (result) {
    responseClient(res, 200, 200, '评论发布成功', result);
    // 发布成功后，向网站主及被回复者发送邮件提醒，并更新网站聚合
    sendMailToAdminAndTargetUser(result, permalink)
    updateArticleCommentCount([result.post_id])
  } else
    responseClient(res, 200, 202, '评论发布失败', null)
}

exports.putComment = async (req, res, next) => {
  const _id = req.params.id
  console.log(req.request.body)

  let {
    post_ids,
    state,
    author
  } = req.request.body

  if (!state || !post_ids) {
    req.throw(401, '参数无效')
    return false
  }

  if (author) {
    author = JSON.parse(author)
  }

  post_ids = Array.of(Number(post_ids))

  const result = await Comment
    .findByIdAndUpdate(_id, { ...ctx.request.body,
      author
    })
    .catch(err => ctx.throw(500, '服务器内部错误'))
  if (result) {
    responseClient(ctx, 200, 200, '评论状态修改成功', result)
    updateArticleCommentCount(post_ids)
  } else responseClient(ctx, 200, 202, '评论状态修改失败', null)
}

exports.deleteComment = async (req, res, next) => {
  const _id = req.params.id

  const post_ids = Array.of(Number(req.query.post_ids))

  const result = await Comment
    .findByIdAndRemove(_id)
    .catch(err => req.throw(500, '服务器内部错误'))
  if (result) {
    responseClient(req, 200, 200, '删除成功', result)

    updateArticleCommentCount(post_ids)
  } else
    responseClient(req, 200, 202, '删除评论失败', null)
}
