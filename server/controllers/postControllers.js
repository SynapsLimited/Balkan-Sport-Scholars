const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const { v4: uuid } = require('uuid');
const { put } = require('@vercel/blob');

// Helper functions for Vercel Blob storage

const uploadToVercelBlob = async (fileBuffer, fileName) => {
  try {
    // Upload the file buffer to Vercel Blob storage
    const { url } = await put(fileName, fileBuffer, {
      access: 'public', // Ensure the file is publicly accessible
      token: process.env.BLOB_READ_WRITE_TOKEN, // Token with read/write access
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`, // Add Vercel API token
      },
    });

    // Log the success and return the URL
    console.log('Uploaded successfully to Vercel Blob:', url);
    return url; // Return the public URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to Vercel Blob:', error);
    throw new Error('Failed to upload file to Vercel Blob');
  }
};

const deleteFromVercelBlob = async (fileUrl) => {
  try {
    if (!fileUrl) {
      console.log('No file to delete.');
      return;
    }

    const fileName = fileUrl.split('/').pop(); // Extract file name from URL
    const response = await fetch(`https://api.vercel.com/v2/blob/files/${fileName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`, // Vercel API token for authorization
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete from Vercel Blob Storage');
    }

    console.log(`Deleted successfully from Vercel Blob: ${fileName}`);
  } catch (error) {
    console.error('Error deleting file from Vercel Blob:', error);
  }
};

// ======================== Create a post
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
  try {
    const { title, title_en, category, description, description_en } = req.body;

    if (!title || !category || !description || !req.file) {
      return next(new HttpError('Fill in all fields and choose a thumbnail.', 422));
    }

    const thumbnail = req.file.buffer;
    const fileName = `thumbnails/${Date.now()}-${req.file.originalname}`;

    const thumbnailUrl = await uploadToVercelBlob(thumbnail, fileName);

    const newPost = await Post.create({
      title,
      title_en,
      category,
      description,
      description_en,
      thumbnail: thumbnailUrl,
      creator: req.user.id,
    });

    // Update user's post count
    const currentUser = await User.findById(req.user.id);
    currentUser.posts += 1;
    await currentUser.save();

    res.status(201).json(newPost);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Get all posts
// GET : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Get single post
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError('Post not found.', 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError('Post does not exist', 404));
  }
};

// ======================== Get posts by Category
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error.message || 'Something went wrong', 500));
  }
};

// ======================== Get author posts
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError('User does not exist', 404));
  }
};

// ======================== Edit post
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, title_en, category, description, description_en } = req.body;

    if (!title || !category || !description) {
      return next(new HttpError('Fill in all fields.', 422));
    }

    const oldPost = await Post.findById(postId);
    if (!oldPost) {
      return next(new HttpError('Post not found.', 404));
    }

    let newThumbnailUrl = oldPost.thumbnail;

    if (req.file) {
      const thumbnail = req.file.buffer;
      const fileName = `thumbnails/${Date.now()}-${req.file.originalname}`;
      newThumbnailUrl = await uploadToVercelBlob(thumbnail, fileName);

      if (oldPost.thumbnail) {
        await deleteFromVercelBlob(oldPost.thumbnail);
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        title_en,
        category,
        description,
        description_en,
        thumbnail: newThumbnailUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    return next(new HttpError(error.message || "Couldn't update post", 500));
  }
};

// ======================== Delete post
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError('Post unavailable.', 400));
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError('Post not found.', 404));
    }

    // Attempt to delete the thumbnail from Vercel Blob storage
    if (post.thumbnail) {
      await deleteFromVercelBlob(post.thumbnail);
    }

    // Delete the post from the database
    await Post.findByIdAndDelete(postId);

    // Update user post count
    const currentUser = await User.findById(req.user.id);
    currentUser.posts -= 1;
    await currentUser.save();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return next(new HttpError("Couldn't delete post.", 400));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost,
};
