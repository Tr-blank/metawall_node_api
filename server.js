const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const headers = require('./headersSetting');
const successHandle = require('./successHandle');
const getPost = require('./api/getPost');
const postPost = require('./api/postPost');
const deletePost = require('./api/deletePost');
const patchPost = require('./api/patchPost');

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB) // 連線資料庫
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

const requestListener = (req, res)=>{    
  if(req.url=='/posts' && req.method == 'GET'){
    getPost(res);
  }else if(req.url=='/posts' && req.method == 'POST'){
    postPost(res, req);
  }else if(req.url=='/posts' && req.method == 'DELETE'){
    deletePost(res);
  }else if(req.url.startsWith('/posts/') && req.method=='DELETE'){
    deletePost(res, req);
  }else if(req.url.startsWith('/posts/') && req.method=='PATCH'){
    patchPost(res, req);
  }else if(req.method == 'OPTIONS'){
    successHandle(res);
  }else{
    res.writeHead(404,headers);
    res.write(JSON.stringify({
        'status': 404,
        'message': '無此網站路由'
    }));
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
