import postModel from "../model/postModel.js";

//create post model
const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = new postModel({
            title,
            content,
            userId
        });
        await newPost.save();
        res.status(201).json({date: newPost,
            message: "Post created successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
        
        
    }
}

// get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json({data:posts,
            message: "Posts fetched successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}


// get post by id
const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.find({userId:id}).where('isDelete').equals(false);
        res.status(200).json({data:post,
            message: "Post fetched successfully",
            error: false
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}

//edit post
const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found",
                error: true
            });
        }
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost,
            error: false
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: true
        });
    }
}

//delete post
const deletePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const exists = await postModel.findById(id)
        if (exists) {
            const delete_data = await postModel.findByIdAndUpdate(
                { _id: id },
                { isDelete: !exists.isDelete },
                { new: true })
            res.status(200).json({
                message: "success",
                data: delete_data
            })
        }
        else {
            res.status(400).json({
                message: "not exists"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { createPost, getAllPosts, getPostById, editPost, deletePost }
