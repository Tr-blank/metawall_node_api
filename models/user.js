const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, '姓名為必填'],
    },
    avatar:{
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: null,
    },
    email: {
      type: String,
      required: [true, "信箱為必填"],
      unique: true // 唯一值
    },
    password: {
      type: String,
      required: [true, "密碼為必填"],
      minlength: 8,
      select: false
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
