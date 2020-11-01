const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/data/cityinfo',
    createProxyMiddleware({
      target: 'http://www.weather.com.cn',
      changeOrigin: true,
    })
  );
};