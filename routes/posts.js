const express = require('express');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');
const handleSuccessRes = require('../service/handleSuccessRes');
const { isAuth } = require('../service/auth');
const Post = require('../models/post');
const User = require('../models/user')
const router = express.Router();

// 取得所有貼文
router.get('/', handleErrorAsync(async (req, res, next) => {
  const { sort, keyword } = req.query;
  const timeSort = sort == 'asc' ? 'createdAt':'-createdAt'
  const query = keyword ? { content: new RegExp(req.query.keyword) } : {};
  const posts = await Post.find(query).populate({
      path: 'user',
      select: 'name avatar'
    }).sort(timeSort);
  handleSuccessRes(res, posts, '取得成功');
}));

// 取得單筆貼文
router.get('/:id', handleErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const posts = await Post.findById(id).populate({
      path: 'user',
      select: 'name avatar'
    });
    handleSuccessRes(res, posts, '取得成功');
}));

// 新增單筆貼文
router.post('/', isAuth, handleErrorAsync(async (req, res, next) => {
    const postData = { 
      ...req.body,
      user: req.user.id,
      content: req.body.content.trim()
    }
    if (postData.content === '') return next(appError(400, 'content 貼文內容不可為空值'))
    const newPost = await Post.create(postData);
    handleSuccessRes(res, newPost, '新增成功');
}));

// 更新單筆貼文
router.patch('/:id', isAuth, handleErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const postData = { 
      ...req.body,
      user: req.user.id,
      content: req.body.content.trim()
    }
    if (Object.keys(postData).length === 0) return next(appError(400, '未取得更新資料'))
    if (postData.content) postData.content = postData.content.trim()
    if (postData.content === '') return next(appError(400, 'content 貼文內容不可為空值'))
    const posts = await Post.findById(id).populate({ path: 'user', select: 'id' });
    if (posts.user.id !== req.user.id) return next(appError(403, '無權限更改此篇貼文'))
    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
    handleSuccessRes(res, updatedPost, '更新成功');
}));

// 刪除單筆貼文
router.delete('/:id', isAuth, handleErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const posts = await Post.findById(id).populate({ path: 'user', select: 'id' });
    if (posts.user.id !== req.user.id) return next(appError(403, '無權限刪除此篇貼文'))
    const result = await Post.findByIdAndDelete(id);
    if (!result) return next(appError(400, `查無此貼文ID:${id}`))
    handleSuccessRes(res, result, '刪除成功');
}));

module.exports = router;