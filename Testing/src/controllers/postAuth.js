import dotenv from 'dotenv';
dotenv.config();

import AppError from '../utils/appError.js';
import AsyncHandler from '../utils/asyncHandler.js';
import postModel from '../models/posts.js';
import userModel from '../models/user.js';

export const postCreate = AsyncHandler(async (req, res) => {
    const {title, content} = req.body;

    const User = await userModel.findOne({ _id: req.user.id });
    if(!User) throw new AppError("User Not Found", 404);

    const post = await postModel.create({
        title,
        content,
        author: req.user.id
    });

    User.posts.push(post._id);
    await User.save();

    res.status(201).json({
        success: true,
        message: "Post Created Successfully",
        post
    });

})

export const postUpdate = AsyncHandler(async (req, res) => {
    const {title, content} = req.body;
    const User = await userModel.findOne({ _id: req.user.id }).populate("posts");
    if(!User) throw new AppError("User Not Found", 404);

    const post = await postModel.findOne({
        _id: req.params.id,
        author: User._id
    });
    if(!post) throw new AppError("Post Not Found", 404);

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({
        success: true,
        message: "Post Updated Successfully",
        post
    });
});

export const postDelete = AsyncHandler(async (req, res) => {
    const User = await userModel.findOne({ _id: req.user.id }).populate("posts");
    if(!User) throw new AppError("User Not Found", 404);

    const post = await postModel.findOne({
        _id: req.params.id,
        author: User._id
    });
    if(!post) throw new AppError("Post Not Found", 404);

    await post.deleteOne();

    res.status(200).json({
        success: true,
        message: "Post Deleted Successfully",
    });
});

export const getAllPosts = AsyncHandler(async (req, res) => {
    const User = await userModel.findOne({ _id: req.user.id }).populate("posts");
    if(!User) throw new AppError("User Not Found", 404);

    const allPosts = User.posts.reverse().map(post => ({
        id: post._id,
        title: post.title,
        content: post.content
    }));

    res.status(200).json({
        success: true,
        posts: allPosts
    });
});

export const getAllPostsV2 = AsyncHandler(async (req, res) => {
    const User = await userModel.findOne({ _id: req.user.id }).populate("posts");
    if(!User) throw new AppError("User Not Found", 404);

    const postsHTML = User.posts.reverse().map(post => `
        <div> 
            <h1>${User.name}</h1>
            <h3>${post.content}</h3>
        </div>
    `).join("");
    res.send(postsHTML);
});