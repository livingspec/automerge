module.exports = {
    future: {
        webpack5: true,
    },
    webpack(config, options) {
        config.experiments = {...config.experiments, asyncWebAssembly: true};

        // workers do not work properly without using fullhash.
        // See https://github.com/webpack/webpack/issues/12676 and the related discussions
        config.output.chunkFilename = options.isServer
            ? `${options.dev ? '[name]' : '[name].[fullhash]'}.js`
            : `static/chunks/${options.dev ? '[name]' : '[name].[fullhash]'}.js`;

        return config;
    }
}
