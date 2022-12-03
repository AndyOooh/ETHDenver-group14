import axios from 'axios';

const BASEURL =
  process.env.NODE_ENV === 'production'
    ? 'https://encode-server.herokuapp.com/'
    : 'http://localhost:3500';

export const api = axios.create({
  baseURL: BASEURL
  // headers: {
  //     'Content-type': 'application/json',
  // },
});
