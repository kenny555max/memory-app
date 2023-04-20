import postModel from '../model/post.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const getPost = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT;
        console.log(new Date())
        const posts = await postModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        console.log(new Date())
        const total = await postModel.countDocuments();

        res.status(200).json({ data: posts, totalNumberOfPages: total / LIMIT, currentPage: Number(page) });
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const getPostDetails = async (req, res) => {
    const { id: _id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ msg: `This post id: ${_id} cannot be found` });

        const post = await postModel.findById(_id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = async (req, res) => {
    const { query, tags } = req.query;
    
    try {
        const search = new RegExp(query, 'i');

        const posts = await postModel.find({ $or: [ { title: search }, { tags: { $in: [...tags.split(',')] } } ] });

        res.status(200).json(posts);
    } catch (error) { 
        res.status(404).json(error.message);
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;

    if (!req.userId) return res.status(401).json({ msg: 'Unauthorized' });

    const newPost = new postModel({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        
        res.status(200).json(newPost);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const editPost = async (req, res) => {
    const post = req.body;
    const { id:_id } = req.params;

    try {
        if (!req.userId) return res.status(401).json({ msg: 'Unauthorized' });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ msg: `This post id: ${_id} cannot be found` });

        const updatedPost = await postModel.findByIdAndUpdate(_id, post, { new: true });
        
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deletePost = async (req, res) => {
    const { id:_id } = req.params;

    try {
        if (!req.userId) return res.status(401).json({ msg: 'Unauthorized' });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ msg: `This post id: ${_id} cannot be found` });

        await postModel.findByIdAndRemove(_id);
        
        res.status(200).json({ msg: 'Post deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const likePost = async (req, res) => {
    const { id:_id } = req.params;

    try {
        if (!req.userId) return res.status(401).json({ msg: 'Unauthorized' });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ msg: `This post id: ${_id} cannot be found` });

        let post = await postModel.findById(_id);

        const index= post.likeCount.findIndex((index) => index === req.userId);

        if (index !== -1){
            post.likeCount = post.likeCount.filter((like) => like !== req.userId);
        }else{
            post.likeCount.push(req.userId);
        }

        const updatePost = await postModel.findByIdAndUpdate(_id, post, { new: true });
        
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error);
    }
}