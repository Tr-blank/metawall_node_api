const Posts = require('../models/post');
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');

const deletePost = async (res, req = null) => {
  if (!req) {
    try {
      const posts = await Posts.deleteMany({});
      successHandle(res, posts); 
    } catch (error) {
      errorHandle(res);
    }
  } else {
    try {
      const id = req.url?.split('/')?.pop();
      const result = await Posts.findByIdAndDelete(id);

      successHandle(res, result);
    } catch (error) {
      errorHandle(res);
    }
  }
};

module.exports = deletePost;
