import express from 'express';
import { getPosts, createPosts, editPost, deletePost, likePost, getPost, getPostsBySearch, getPostDetails } from '../controllers/posts.js';
import middleware from '../middleware/middleware.js';

const route = express.Router();

route.get('/', getPosts);
route.get('/getPost', getPost);
route.get('/fetchPostsBySearch', getPostsBySearch);
route.get('/:id/getPostDetails', getPostDetails);

route.post('/', middleware, createPosts);
route.patch('/:id/editPost', middleware, editPost);
route.delete('/:id/deletePost', middleware, deletePost);
route.patch('/:id/likePost', middleware, likePost);

export default route;