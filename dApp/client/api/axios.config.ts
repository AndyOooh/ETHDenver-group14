import axios from 'axios';

const BASEURL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:3500' : 'http://localhost:3500';

export const api = axios.create({
  baseURL: BASEURL
  // headers: {
  //     'Content-type': 'application/json',
  // },
});
