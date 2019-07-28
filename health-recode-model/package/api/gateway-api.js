import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
    headers: {
        'weiyi-appid': config.appid,
        'weiyi-authtoken': '' // TODO: 问下笑天是否需要token
    }
})

export default instance;