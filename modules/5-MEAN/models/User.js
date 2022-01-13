const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    }  
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports.getUserByUsername = async (username) => {
    try {
        return await User.findOne({username: username});
    }  
    catch(e) {
        console.error(e);
        return null;
    }
}

module.exports.addUser = async (user) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(user.password, salt);
        user.password = hashed;
        await user.save();
    }
    catch(e) {
        console.error(e);
    }
}

module.exports.comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    }
    catch(e) {
        console.error(e);
        return false;
    }
}