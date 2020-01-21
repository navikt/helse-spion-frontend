const {
    override,
    addLessLoader,
    overrideDevServer,
    watchAll
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        proxy: {
            '/api': {
                target: process.env.proxy || 'http://localhost:8080',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/',
                },
                ws: false
            },
        },
    }
}

module.exports = {
    webpack: override(
        // usual webpack plugin
        addLessLoader()
    ),
    devServer: overrideDevServer(
        devServerConfig()

    )
};
