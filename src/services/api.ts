import axios from 'axios';
import { CONSTANTS } from '../constants';

const api = axios.create({
  baseURL: CONSTANTS.ENDPOINT_POKEMON,
  timeout: 10000,
});

export default api;