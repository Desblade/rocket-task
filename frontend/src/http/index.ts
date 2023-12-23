import axios from 'axios';
import type { Axios } from 'axios';

const $host: Axios = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export {
    $host,
};
