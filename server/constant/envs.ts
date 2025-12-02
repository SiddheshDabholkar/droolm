const ENVS = {
  FRONTEND_URLS: process.env.ALLOWED_URLS?.split(","),
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
};

export { ENVS };
