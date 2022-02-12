import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postsMessage.js';

const router = express.Router();

export const getPosts = async(req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);


        const { id: _id } = req.params;
        // console.log(_id);
        //const postMessage = await PostMessage.find();

        // res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });

    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);

    }
}

export const getPostsByType = async(req, res) => {
    try {
        const postMessages = await PostMessage.find();
        //console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
}

export const getPost = async(req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        //console.log(id)
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async(req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json({ data: posts });

    } catch (error) {
        res.status(404).json({ message: error.message });

    }


}


export const createPost = async(req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

export const updatePost = async(req, res) => {

    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");
    //console.log('Deleted');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully ' });
}

export const likePost = async(req, res) => {
    const { id } = req.params;
    if (!req.userId) return res.json({ message: 'unathunticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));

    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export default router;