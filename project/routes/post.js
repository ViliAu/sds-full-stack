const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const passport = require('passport');
require('../auth/passport.js')(passport)

// Get all posts
router.get('/', async (req, res) => {
    const {user} = req.query;
    try {
        let posts = [];
        if (!user)
            posts = await Post.getAllPosts();
        else
            posts = await Post.getPostByAuthorID(user);
        res.json({success: true, posts: posts});
    }
    catch(e) {
        console.log(e);
    }
});

// Get a singular post by id
router.get('/:title', async (req, res) => {
    try {
        const posts = await Post.getPostsByTitle(req.params.title);
        res.json({success: true, posts: posts});
    }
    catch(e) {
        console.log(e);
    }
})

// Post a new post
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    // Assert title and body length
    if (!req.body.title ||!req.body.text || req.body.title.length < 3 || req.body.text.length < 10) {
        return res.json({success: false, msg: "Post title or body too short!"});
    }
    const p = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.user._id,
    });
    try {
        const success = await Post.addPost(p);
        if (success)
            res.json({success: true, msg: "Post added!"});
        else
            res.json({success: false, msg: "Something went wrong!"});
    }
    catch(e) {
        console.log(e);
        res.json({success: false, msg: "Something went wrong!"});
    }
});

module.exports = router;