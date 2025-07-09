export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  STREAM_API_KEY: process.env.STREAM_API_KEY as string,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET as string,
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} is not set`);
  }
});
