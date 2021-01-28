import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8000',
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
});

export default request;
