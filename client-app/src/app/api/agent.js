import axios from 'axios';
import { toast } from 'react-toastify'
import { history } from '../..';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response) => response.data;

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;

}, (error) => {
    const { data, status, config } = error.response;
    switch(status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modelStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            } 
            break;
        case 401:
            toast.error('unauth');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;

    }
    return Promise.reject(error);
})


const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => requests.get('/activities'),
    details: (id) => requests.get(`/activities/${id}`),
    create: (activity) => axios.post('/activities', activity),
    update: (activity) => axios.put(`/activities/${activity.id}`, activity),
    delete: (id) => axios.delete(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;