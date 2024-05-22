const express = require('express');
const router = express.Router();
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');
const Post = require('../models/post');
const User = require('../models/user')

// 取得所有貼文
router.get('/', async (req, res, next) => {
  try {
    const { sort, keyword } = req.query;
    const timeSort = sort == "asc" ? "createdAt":"-createdAt"
    const query = keyword ? { content: new RegExp(req.query.keyword) } : {};
    const posts = await Post.find(query).populate({
        path: 'user',
        select: 'name avatar'
      }).sort(timeSort);
    successHandle(res, posts, '取得成功');
  } catch (error) {
    errorHandle(res, error, '取得失敗');
  }
});

// 取得單筆貼文
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById(id).populate({
      path: 'user',
      select: 'name avatar'
    });
    successHandle(res, posts, '取得成功');
  } catch (error) {
    errorHandle(res, error, '取得失敗');
  }
});

// 新增單筆貼文
router.post('/', async (req, res, next) => {
  try {
    const postData = req.body;
    postData.content = postData.content.trim()
    if (!postData.content) throw 'content 貼文內容不可為空值'
    const newPost = await Post.create(postData);
    successHandle(res, newPost, '新增成功');
  } catch (error) {
    errorHandle(res, error, '新增失敗');
  }
});

// 更新單筆貼文
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = req.body;
    if (Object.keys(postData).length === 0) throw '未取得更新資料'
    if (postData.content) postData.content = postData.content.trim()
    if (postData.content === '') throw 'content 貼文內容不可為空值'
    const updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
    successHandle(res, updatedPost, '更新成功');
  }
  catch (error) {
    errorHandle(res, error, '更新失敗');
  }
});

// 刪除單筆貼文
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) throw `查無此貼文ID:${id}`
    successHandle(res, result, '刪除成功');
  } catch (error) {
    errorHandle(res, error, '刪除失敗');
  }
});

// 刪除全部貼文
router.delete('/', async (req, res, next) => {
  try {
    if (req.originalUrl === '/posts/') throw '未輸入要刪除的貼文ID'
    const result = await Post.deleteMany({});
    successHandle(res, result, '刪除成功');
  } catch (error) {
    errorHandle(res, error, '刪除失敗');
  }
});

module.exports = router;