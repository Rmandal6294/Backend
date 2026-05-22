import AsyncHandler from "../utils/AsyncHandler.js"
import AppError from "../utils/AppError.js"
import Post from "../models/post.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

// GET /api/v1/posts?page=1&limit=10&search=js&sort=title&order=asc
export const getAllPost = AsyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "createdAt", order = "desc" } = req.query

    // $regex = pattern matching || $options: 'i' = case-insensitive
    const filter = search ? { title: { $regex: search, $options: 'i' } } : {}

    //Page 1 → skip 0 || Page 2 → skip first 10 || Page 3 → skip first 20
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [posts, total] = await Promise.all([ // posts → paginated posts data || total → total number of matching posts
        Post.find(filter) // Find posts matching the filter.
            .sort({ [sort]: order === "asc" ? 1 : -1 }) // 1 → ascending || -1 → descending
            .skip(skip)
            .limit(parseInt(limit)),

        // Counts how many posts match the filter
        Post.countDocuments(filter)
    ])

    res.status(200).json({
        success: true,
        data: posts,

        pagination: {
            total, // Total number of matching documents.
            page: parseInt(page), // Current page number
            totalPages: Math.ceil(total / parseInt(limit)) // Calculates total number of pages.
        }
    })

})

// GET /api/v1/posts/:id
// export const getPost = asyncHandler(async (req, res) => {

//     const post = await Post.findById(req.params.id)

//     if (!post) throw new AppError('Post not found', 404)

//     res.status(200).json({
//         success: true,
//         data: post
//     })
// })

// POST /api/v1/posts
export const createPost = AsyncHandler(async (req, res) => {
    const {title, content} = req.body

    const post = await Post.create({ 
        title,
        content  
    })

    res.status(201).json({
        success: true,
        data: post
    })
})

// PUT /api/v1/posts/:id
// export const updatePost = asyncHandler(async (req, res) => {

//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//         new: true, // it returns the UPDATED document.
//         runValidators: true // Runs schema validations during update.
//     })

//     if (!post) throw new AppError('Post not found', 404)

//     res.status(200).json({
//         success: true,
//         data: post
//     })
// })

// DELETE /api/v1/posts/:id
// export const deletePost = asyncHandler(async (req, res) => {

//   const post = await Post.findByIdAndDelete(req.params.id)

//   if (!post) throw new AppError('Post not found', 404)

//   res.status(204).json({
//     success: true,
//     message: "User Deleted Successfully"
//   })
// })

