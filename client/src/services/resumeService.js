import api from './api';

export const resumeService = {
    create: (data) => api.post('/resumes', data).then((r) => r.data),
    getAll: () => api.get('/resumes').then((r) => r.data),
    getOne: (id) => api.get(`/resumes/${id}`).then((r) => r.data),
    update: (id, data) => api.put(`/resumes/${id}`, data).then((r) => r.data),
    delete: (id) => api.delete(`/resumes/${id}`).then((r) => r.data),
    share: (id) => api.post(`/resumes/${id}/share`).then((r) => r.data),
};

export const authService = {
    register: (data) => api.post('/auth/register', data).then((r) => r.data),
    login: (data) => api.post('/auth/login', data).then((r) => r.data),
    getMe: () => api.get('/auth/me').then((r) => r.data),
};

export default resumeService;
