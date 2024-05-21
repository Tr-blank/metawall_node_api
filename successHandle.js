const headers = require('./headersSetting');

function successHandle(res, data = [], message = '成功') {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 200,
        data,
        message
      })
    );
    res.end();
  }
  
  module.exports = successHandle;
  