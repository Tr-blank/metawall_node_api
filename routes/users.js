const express = require('express');
const router = express.Router();
const appError = require("../service/appError");
const handleErrorAsync = require("../service/handleErrorAsync");
const handleSuccessRes = require('../service/handleSuccessRes');
const User = require('../models/user');

// 取得所有會員資訊
router.get('/', handleErrorAsync(async (req, res, next) => {
    const users = await User.find();
    handleSuccessRes(res, users, '取得成功');
}));

// 取得單筆會員資訊
router.get('/:id', handleErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const posts = await User.findById(id);
    handleSuccessRes(res, posts, '取得成功');
}));

// 新增單筆會員資訊
router.post('/', handleErrorAsync(async (req, res, next) => {
    const postData = req.body;
    postData.name = postData.name.trim()
    if (!postData.name) return next(appError(400, 'name 不可為空值'))
    const newPost = await User.create(postData);
    handleSuccessRes(res, newPost, '新增成功');
}));

// 更新單筆會員資訊
router.patch('/:id', handleErrorAsync(async (req, res, next) => {
    const { id } = req.params;
    const postData = req.body;
    if (Object.keys(postData).length === 0) return next(appError(400, '未取得更新資料'))
    if (postData.name) postData.name = postData.name.trim()
    if (postData.name === '') return next(appError(400, 'name 不可為空值'))
    const updatedPost = await User.findByIdAndUpdate(id, postData, { new: true });
    handleSuccessRes(res, updatedPost, '更新成功');
}));


module.exports = router;


