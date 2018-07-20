import mongoose from 'mongoose';
/**
 * tag 表结构
 */
const tag = new mongoose.Schema({
  tagName: {
    type: String,
    trim: true,
    required: true
  }
});
const tagModel = mongoose.model('tags', tag);
module.exports = tagModel;