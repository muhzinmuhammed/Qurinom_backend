import express from 'express'
import { createPost, getAllPosts, getPostById, editPost, deletePost } from '../controller/postController.js'

const router = express.Router()

//create post
router.post('/create_post', createPost)

//get all posts
router.get('/get_all_posts', getAllPosts)

//get post by id
router.get('/get_post_by_id/:id', getPostById)


//edit post
router.put('/edit_post/:id', editPost)

//delete post
router.put('/delete_post/:id', deletePost)

export default router

