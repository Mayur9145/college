import express from 'express';

import auth from '../middleware/auth.js';


import { getPostsBySearch, getPostsByType, getPosts, getPost, createPost, updatePost, deletePost, likePost } from '../controller/posts.js'

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/women', getPostsByType);
router.get('/workshop', getPostsByType);
router.get('/inter', getPostsByType);
router.get('/intra', getPostsByType);
router.get('/seminar', getPostsByType);
//router.get('/seminar', getPostsByType);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;


// http://localhost:3000/posts