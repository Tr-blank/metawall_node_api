const headers = require('./headersSetting');

const errorHandle = (res, error, message = '失敗', status = 400) => {
  res.writeHead(400, headers);
  res.write(JSON.stringify({
    status,
    message,
    error, 
  }));
  res.end();
}

module.exports = errorHandle;
