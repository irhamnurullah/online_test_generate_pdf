/** @type {import('next').NextConfig} */
// const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  // webpack(config, { isServer }) {
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: 'remote',
  //       filename: 'static/chunks/remoteEntry.js',
  //       exposes: {
  //         './Button': './components/Button.js',
  //         // './components/Logo': './components/Logo',
  //       },
  //     })
  //   );

  //   return config;
  // },
};

module.exports = nextConfig;
