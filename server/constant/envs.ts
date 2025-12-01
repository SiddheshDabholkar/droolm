const ENVS = {
  FRONTEND_URLS: process.env.ALLOWED_URLS?.split(","),
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};

export { ENVS };
