const Posts = require('../models/post');
const successHandle = require('../successHandle');
const errorHandle = require('../errorHandle');

const patchPost = async (res, req) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }); 
    req.on('end', async () => {
        try {
            const id = req.url.split('/').pop();
            const postData = JSON.parse(body);
            await Posts.findByIdAndUpdate(id, postData);
            const newPost = { _id: id, ...postData };
            successHandle(res, newPost);
        }
        catch (error) {
            errorHandle(res, error);
        }
    });
}

module.exports = patchPost;
