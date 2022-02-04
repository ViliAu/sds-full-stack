const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const passport = require('passport');
require('../auth/passport.js')(passport)

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        res.json({success: true, posts: posts});
    }
    catch(e) {
        console.log(e);
    }
});

// Get a singular post by id
router.get('/:title', async (req, res) => {
    try {
        const posts = await Post.getPostsByTitle(title);
        res.json({success: true, posts: posts});
    }
    catch(e) {
        console.log(e);
    }
});

// Post a new post
router.post('/posts', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const p = new Post({
        title: req.body.title,
        body: req.body.text,
        author: req.user._id,
        date: Date.now,
    });
    try {
        await Post.addPost(p);
        res.json({success: true, msg: "Post added!"});
    }
    catch(e) {
        console.log(e);

    }
})