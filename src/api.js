import axios from 'axios';

// Use VITE_API_URL in both development and production. When it is not set,
// fall back to the same-origin /api path (and Vite's local proxy).
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);


// Notice API
export const noticeAPI = {
  getAll: () => api.get('/notices'),
  getById: (id) => api.get(`/notices/${id}`),
  create: (data) => api.post('/notices', data),
  update: (id, data) => api.put(`/notices/${id}`, data),
  delete: (id) => api.delete(`/notices/${id}`),
};

// Career API
export const careerAPI = {
  getAll: () => api.get('/careers'),
  getAllAdmin: () => api.get('/careers/all'),
  getById: (id) => api.get(`/careers/${id}`),
  create: (data) => api.post('/careers', data),
  update: (id, data) => api.put(`/careers/${id}`, data),
  delete: (id) => api.delete(`/careers/${id}`),
};

// Blog API
// Blog API - Updated
export const blogAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/blogs${queryString ? '?' + queryString : ''}`);
  },
  getBySlug: (slug) => api.get(`/blogs/${slug}`),
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return api.post('/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return api.put(`/blogs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/blogs/${id}`),
};
// Gallery API
export const galleryAPI = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  // data can include a `file` (File object, when sourceType is 'upload') or a
  // `mediaUrl` string (when sourceType is 'url'). We always send FormData so the
  // same multer middleware handles both cases on the backend.
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key === 'file' ? 'file' : key, data[key]);
      }
    });
    return api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key === 'file' ? 'file' : key, data[key]);
      }
    });
    return api.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => api.delete(`/gallery/${id}`),
};

// Admin API
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  register: (data) => api.post('/admin/register', data),
  getCurrent: () => api.get('/admin/me'),
};

export const enquiryAPI = {
  submit: (data) => api.post('/enquiries', data),
};

export const webinarAPI = {
  register: (data) => api.post('/webinar-registrations', data),
};

export const enrollmentAPI = {
  submit: (data) => api.post('/enrollments', data),
};

export const submissionAPI = {
  contact: (data) => api.post('/submissions/contact', data),
  advisor: (data) => api.post('/submissions/advisor', data),
  partnership: (data) => api.post('/submissions/partnership', data),
  career: (data) => {
    const body = new FormData();
    Object.entries(data).forEach(([key, value]) => body.append(key, value));
    return api.post('/submissions/career', body);
  },
};

export default api;
