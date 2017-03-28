import axios from 'axios';
import getConfig from './getConfig';
const config = getConfig();
const RestClient = axios.create({
    baseURL: config.API_ENDPOINT,
    timeout: 1000
});

export default RestClient;
