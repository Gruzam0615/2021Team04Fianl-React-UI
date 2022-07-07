const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/v1/search/local.json", {
            target: "https://openapi.naver.com/",
            changeOrigin: true
        })
    )

    app.use(
        createProxyMiddleware("/v1/search/image", {
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

    app.use(
        createProxyMiddleware("/api/FindShop", {
            target: "http://localhost:8080/",
            changeOrigin: true
        })
    )
    
    //2022.07 기준 바뀐 방식
    /*
    app.use("/api/FindShop",
        createProxyMiddleware({
            target: "http://localhost:8080/",
            changeOrigin: true
        })
    )
    */
}
