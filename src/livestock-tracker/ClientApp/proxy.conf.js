const target = process.env.services__api__https__0 || process.env.services__api__http__0 || 'https://localhost:5001';

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
  },
};