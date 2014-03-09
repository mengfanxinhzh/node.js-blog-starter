/**
 * /models/post.js
 */

var mongoose = require('mongoose');

var Comment = require('./comment');
var Tag = require('./tag');

/**
 * 文章模型
 */

var PostSchema = new mongoose.Schema({
  // 标题
  title: String,
  // slugify
  slug: String,
  // 内容
  content: String,
  // 评论
  comments: [Comment.schema],
  // 标签
  tags: [Tag.schema],
  // 创建时间
  created: { type: Date, default: Date.now },
  // 更新时间
  updated: { type: Date, default: Date.now }
});

PostSchema.static('findAll', function (skip, limit, fields, callback) {
  var options = {
    skip: skip,
    limit: limit,
    sort: {
      created: -1,
      _id: -1
    }
  };

  return this.find(null, fields, options, callback);
});

module.exports = mongoose.model('Post', PostSchema);