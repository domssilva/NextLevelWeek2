import axios from 'axios';

const server = 'http://localhost:3333';

const api = axios.create({
    baseURL: server,
});

export default api;
