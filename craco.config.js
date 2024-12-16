const path = require('path');

module.exports = {
  // style: {
  //     css: {
  //         loaderOptions: {
  //             sourceMap: true,
  //         }
  //     },
  //     sass: {
  //         loaderOptions: {
  //             sourceMap: true,
  //         }
  //     },
  // },
  // eslint: {},
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // plugins: {
    //   add: [ /* ... */ ],
    //   remove: [ /* ... */ ],
    // },
    // configure: { /* ... */},
    // configure: (webpackConfig, { env, paths }) => {
    //   /* ... */
    //   return webpackConfig;
    // },
  },
  devServer: {
    // before: function(app) {
    //   mockServer(app)
    // },
    proxy: {
      '/hhh': {
        target: 'xxx',
        // ws: false,
        changeOrigin: true,
        pathRewrite: {
          // '^/api/old-path': '/api/new-path', // rewrite path
          // '^/api/remove/path': '/path', // remove base path
        },
        router: {
          // 'dev.localhost:3000': 'http://localhost:8000',
        },
      }
    }
  },
};
