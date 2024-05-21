const express = require('express');
const router = express.Router();
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');
const Post = require('../models/posts');
const { Error } = require('mongoose');

// 取得所有貼文
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    successHandle(res, posts, '取得成功');
  } catch (error) {
    errorHandle(res, error, '取得失敗');
  }
});

// 取得單筆貼文
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById(id);
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
router.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) throw `查無此貼文ID:${id}`
    successHandle(res, result, '刪除成功');
  } catch (error) {
    errorHandle(res, error, '刪除失敗');
  }
});

module.exports = router;