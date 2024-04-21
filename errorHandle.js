const headers = require('./headersSetting');

const errorHandle = (res, error = '') => {
  res.writeHead(400, headers);
  res.write(JSON.stringify({
    status: 400,
    message: '欄位未填寫正確，或無此 todo ID',
    error, 
  }));
  res.end();
}

module.exports = errorHandle;
