export const BASE_API_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://typing-website-production.up.railway.app'
    : 'https://typing-website-production.up.railway.app';
