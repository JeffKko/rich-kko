import axios, { AxiosResponse, AxiosError } from 'axios';

export const richkkoApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// richkkoApi.interceptors.request.use(
//   config => {
//     if (true) {
//       const unAuthError = {
//         response: {
//           data: '',
//           status: 401,
//         },
//       } as AxiosError;
//       return Promise.reject(unAuthError);
//     }
//   },
//   err => Promise.reject(err),
// );

export const setAuthHeader = (jwt: string) => {
  richkkoApi.defaults.headers.common['Authorization'] = jwt;
};
