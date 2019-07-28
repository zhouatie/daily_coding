export default {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://development' : 'http://production',
    appid: 'appid',
    token: 'token'
}