const headers = require('./headersSetting');

function successHandle(res, data) {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 200,
        data,
        message: 'success'
      })
    );
    res.end();
  }
  
  module.exports = successHandle;
  