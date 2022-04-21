const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/v1/search/local.json", {
            target: "https://openapi.naver.com/",
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware("/map-geocode/v2/geocode", {
            target: "https://naveropenapi.apigw.ntruss.com/",
            changeOrigin: true
        })
    )
}