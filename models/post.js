const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    // name:{
    //   type: String,
    //   default: ''
    // },
    user: {
      type: mongoose.Schema.ObjectId,
      ref:'user',
      required: [true, '貼文姓名未填寫']
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
