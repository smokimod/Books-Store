import axios from 'axios';

export const AuthFetch = axios.create({
  baseURL: 'https://strapi.cleverland.by/api',
  method: 'get',
});
AuthFetch.interceptors.request.use(
  (request) => {
    request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('auth'))?.data?.jwt}`;

    return request;
  },
  (error) => Promise.reject(error)
);
AuthFetch.interceptors.response.use((response) => response);
export const AuthFetchPost = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/auth',
  method: 'post',
});
