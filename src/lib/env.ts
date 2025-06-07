export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
};

Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} is not set`);
  }
});
