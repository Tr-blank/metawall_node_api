const Posts = require('../models/post');
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');

const postPost = async (res, req) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const postData = JSON.parse(body);
      const newPost = await Posts.create(postData);
      successHandle(res, newPost);
    } catch (error) {
      errorHandle(res, error);
    }
  })
}

module.exports = postPost;
