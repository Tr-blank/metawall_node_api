const express = require('express');
const router = express.Router();
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');
const User = require('../models/user');

// 取得所有會員資訊
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    successHandle(res, users, '取得成功');
  } catch (error) {
    errorHandle(res, error, '取得失敗');
  }
});

// 取得單筆會員資訊
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await User.findById(id);
    successHandle(res, posts, '取得成功');
  } catch (error) {
    errorHandle(res, error, '取得失敗');
  }
});

// 新增單筆會員資訊
router.post('/', async (req, res, next) => {
  try {
    const postData = req.body;
    postData.name = postData.name.trim()
    if (!postData.name) throw 'name 不可為空值'
    const newPost = await User.create(postData);
    successHandle(res, newPost, '新增成功');
  } catch (error) {
    errorHandle(res, error, '新增失敗');
  }
});

// 更新單筆會員資訊
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const postData = req.body;
    if (Object.keys(postData).length === 0) throw '未取得更新資料'
    if (postData.name) postData.name = postData.name.trim()
    if (postData.name === '') throw 'name 不可為空值'
    const updatedPost = await User.findByIdAndUpdate(id, postData, { new: true });
    successHandle(res, updatedPost, '更新成功');
  }
  catch (error) {
    errorHandle(res, error, '更新失敗');
  }
});


module.exports = router;


