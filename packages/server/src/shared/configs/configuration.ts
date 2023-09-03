export default (): any => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
  },
  jwt: {
    secret: process.env.JWT_SECRET, // 密钥
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN, // token 过期时效
    },
  },
  redis: {
    url: process.env.REDIS_URL,
  },
})
