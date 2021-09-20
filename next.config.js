module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    GoogleId: process.env.GoogleId,
    SECRETCLIENT: process.env.SECRETCLIENT,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    CLOUDINARY_APIKEY: process.env.CLOUDINARY_APIKEY,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
  webpack(config, options) {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
};
