const ENVS = {
  FRONTEND_URLS: process.env.ALLOWED_URLS?.split(","),
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
};

const AWS = {
  BUCKET_NAME: process.env.BUCKET_NAME!,
  DEFAULT_REGION: process.env.DEFAULT_REGION!,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID!,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY!,
  CLOUDFRONT: process.env.CLOUDFRONT!,
};

export { ENVS, AWS };
