export const BASE_API_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://keykorea.herokuapp.com'
    : 'https://keykorea.herokuapp.com';
