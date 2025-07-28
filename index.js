const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


const targetUrl = 'https://api.backpack.exchange';

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // For production, set this to your frontend domain
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Proxy middleware
// app.use('/tickers', createProxyMiddleware({
//     target: targetUrl,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/tickers': '/tickers',
//     }
// }));

// Proxy all /api/v1/* requests
app.use('/api/v1', createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1': '', // removes /api/v1 from the path
    }
}));

// Use process.env.PORT for deployment compatibility
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});