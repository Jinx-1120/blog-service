import tagsModel from '../models/tags.model';
import { responseClient } from '../util';
/**
 * 添加tag 标签
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.addTag = async (req, res, next) => {
  let {
    tagName,
    description
  } = req.body;
  if (!tagName) {
    responseClient(res, 200, 202, '标签名不可为空');
    next();
  };
  try {
    tagsModel.findOne({
      tagName: tagName
    }).then(data => {
      if (data) {
        responseClient(res, 200, 202, '标签已存在');
        next();
      } else {
        let tag = new tagsModel({
          tagName: tagName,
          description: description,
          time: new Date()
        });
        tag.save().then(saveInfo => {
          responseClient(res, 200, 201, '标签保存成功', saveInfo);
          next();
        }).catch(err => {
          responseClient(res, 500, 500, '系统异常', err);
          next();
        });
      };
    });
  } catch (err) {
    responseClient(res, 200, 202, '标签保存失败', err);
    next();
  };
};
/**
 * 标签列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.tagList = async (req, res, next) => {
  try {
    tagsModel.find({}).then(data => {
      responseClient(res, 200, 200, '成功', data);
      next();
    }).catch(err => {
      responseClient(res, 500, 500, '服务器异常！', err);
      next();
    });
  } catch (err) {
    responseClient(res, 200, 202, '查询失败', err);
    next();
  };
};
/**
 * 删除标签
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.delTag = async (req, res, next) => {
  let { tagName } = req.body;
  if (!tagName) {
    responseClient(res, 200, 202, '标签名不可为空');
    next();
  } else {
    try {
      tagsModel.remove({ tagName }).then(tagResult => {
        if (tagResult.n === 1) {
          responseClient(res, 200, 201, '删除标签成功！');
          next();
        } else {
          responseClient(res, 200, 202, '标签不存在！');
          next();
        };
      }).catch(err => {
        responseClient(res, 500, 500, '服务器异常！', err);
        next();
      });
    } catch (err) {
      responseClient(res, 200, 500, '删除失败！', err);
      next();
    };
  };
};
