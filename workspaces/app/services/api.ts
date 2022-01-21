import axios from 'axios';

export const richkkoApi = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const setAuthHeader = (jwt: string) => {
  richkkoApi.defaults.headers.common['Authorization'] = jwt;
};
