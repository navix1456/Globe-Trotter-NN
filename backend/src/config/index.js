module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};
