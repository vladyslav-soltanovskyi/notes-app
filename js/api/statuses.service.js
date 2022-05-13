import { request } from "./generic.service.js";

const endpoints = {
    getAll: () => request({ url: `statuses`, method: 'get' }),
    get: (id) => request({ url: `statuses/${id}`, method: 'get' }),
    create: (data) => request({ url: `statuses`, method: 'post', data }),    
    edit: (id, data) => request({ url: `statuses/${id}`, method: 'put', data }),
    delete: (id) => request({ url: `statuses/${id}`, method: 'delete' }),
}

export default endpoints;