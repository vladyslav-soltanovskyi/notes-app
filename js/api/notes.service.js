import { request } from "./generic.service.js";

const endpoints = {
    getAll: () => request({ url: `notes`, method: 'get' }),
    get: (id) => request({ url: `notes/${id}`, method: 'get' }),
    create: (data) => request({ url: `notes`, method: 'post', data }),    
    edit: (id, data) => request({ url: `notes/${id}`, method: 'put', data }),
    delete: (id) => request({ url: `notes/${id}`, method: 'delete' }),
}

export default endpoints;