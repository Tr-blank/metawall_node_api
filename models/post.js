const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            default: ''
        },
        image:{
            type: String,
            default: ''
        },
        content:{
            type: String,
            default: ''
        },
        likes:{
            type: Number,
            default: 0
        },
        comments:{
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Posts = mongoose.model('post', postSchema);

module.exports = Posts;