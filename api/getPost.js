const Posts = require('../models/post');
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');

const getPost = async (res) => {
  try {
    const posts = await Posts.find();
    successHandle(res, posts);
  } catch (error) {
    errorHandle(res);
  }
}

module.exports = getPost;
