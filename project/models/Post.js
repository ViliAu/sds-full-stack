const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId
    },
    date: {
        type: Date
    }
});

const Post = module.exports = mongoose.model('Post', postSchema);

module.exports.getPostByID = async (id) => {
    try {
        return await Post.findById(id);
    }  
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports.getAllPosts = async () => {
    try {
        return await Post.find();
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

module.exports.getPostsByTitle = async (title) => {
    try {
        return await Post.findOne({title: new RegExp('^'+ req.body.name + '$', "i")});
    }  
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports.addPost = async (post) => {
    try {
        await post.save();
    }
    catch(e) {
        console.error(e);
    }
}