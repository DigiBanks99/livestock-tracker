const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:11545';
console.log(target);

const PROXY_CONFIG = [
  {
    context: ['/api/**'],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    },
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG;
