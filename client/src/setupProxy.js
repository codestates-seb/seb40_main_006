const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/jams', '/user'],
    createProxyMiddleware({
      target: `${process.env.REACT_APP_URL}`,
      changeOrigin: true,
    }),
  );
};
