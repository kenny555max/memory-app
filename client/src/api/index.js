import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const fetchPost = (page) => API.get(`/posts/getPost?page=${page}`);
export const getPost = (id) => API.get(`/posts/${id}/getPostDetails`);
export const fetchPostsBySearch = (searchParams) => API.get(`/posts/fetchPostsBySearch?query=${searchParams.search || 'none'}&tags=${searchParams.tags || 'none'}`);
export const createPost = (values) => API.post('/posts', values);
export const editPosts = (id, values) => API.patch(`/posts/${id}/editPost`, values);
export const deletePost = (id) => API.delete(`/posts/${id}/deletePost`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post(`/users/signin`, formData);
export const signup = (formData) => API.post(`/users/signup`, formData);