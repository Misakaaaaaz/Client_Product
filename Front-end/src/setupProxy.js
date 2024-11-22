const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/ajax',
        createProxyMiddleware({
            target: 'https://i.maoyan.com',
            changeOrigin: true,
        })
    );

    // app.use(
    //     '/api',
    //     createProxyMiddleware({
    //         target: 'http://172.20.10.5:8080',  
    //         changeOrigin: true,
    //         onProxyReq: (proxyReq) => {
    //             proxyReq.setHeader('Connection', 'keep-alive'); 
    //         }
    //     })
    // );

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://172.26.117.4:8080',
            changeOrigin: true,
            onProxyReq: (proxyReq) => {
                proxyReq.setHeader('Connection', 'keep-alive');
            }
        })
    );
};
