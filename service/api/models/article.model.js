import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const article = new mongoose.Schema({
  title: {
    // 文章标题
    type: String,
    trim: true,
    required: true
  },
  tags: {
    // 文章所属标签
    type: Array,
    required: true
  },
  content: {
    // 文章内容
    type: String,
    trim: false,
    required: true
  },
  coverImg: {
    // 文章封面
    type: String,
    required: false
  },
  author: {
    // 文章作者
    type: String,
    trim: true,
    required: true
  },
  createTime: {
    // 文章创建时间
    type: String,
    trim: false,
    required: true
  },
  updateTime: {
    // 文章更新时间
    type: String,
    trim: true,
    required: false
  },
  status: {
    // 文章状态
    // 0发布 1 未发布
    type: Number,
    required: true
  },
  viewCount: {
    // 浏览次数
    type: Number,
    default: 0
  },
  reviewArea: {
    // 评论区
    type: Array
  }
});
article.plugin(mongoosePaginate);
const articleModel = mongoose.model('article', article);
module.exports = articleModel;