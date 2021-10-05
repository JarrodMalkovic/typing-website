export const BASE_API_URL =
  process.env.NEXT__PUBLIC__ENVINRONMENT === 'PRODUCTION'
    ? 'https://keykorea.herokuapp.com'
    : 'http://127.0.0.1:8000';
